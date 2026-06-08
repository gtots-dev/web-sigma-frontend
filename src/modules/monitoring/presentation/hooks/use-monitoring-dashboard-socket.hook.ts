'use client'

import { useMemo } from 'react'
import {
  MonitoringCell,
  MonitoringStatus,
  MonitoringConnectionStatus
} from '../../domain/interfaces/monitoring-cell.interface'
import { MonitoringDashboardSocketFactory } from '../../infrastructure/factories/monitoring-dashboard-socket.factory'
import { useWebSocketSubscription } from '@/modules/shared/presentation/hooks/use-websocket-subscription.hook'
import { useWebSocketEngine } from '@/modules/shared/presentation/hooks/use-websocket-engine.hook'
import type { UnifiedMonitoringNode } from './use-monitoring-metadata.hook'
import {
  UpStatusMessage,
  LaneStatusMessage
} from '../../domain/interfaces/monitoring-dashboard-websocket.interface'

import { useMonitoringDashboardStore } from '../stores/use-monitoring-dashboard.store'

export function useMonitoringDashboardSocket(
  nodes: UnifiedMonitoringNode[],
  contractId: string
) {
  const upData = useMonitoringDashboardStore((state) => state.upData)
  const laneData = useMonitoringDashboardStore((state) => state.laneData)
  const hasReceivedInitialData = useMonitoringDashboardStore(
    (state) => state.hasReceivedInitialData
  )
  const updateFromMessages = useMonitoringDashboardStore(
    (state) => state.updateFromMessages
  )

  // 1. Motor de Conexão
  const { service, isConnected, hasFailed, isReconnecting, reconnect, send } =
    useWebSocketEngine(
      () => MonitoringDashboardSocketFactory.create(contractId),
      {
        enabled: nodes.length > 0
      }
    )

  // 2. Ouvindo Mudanças (Memorizamos a função de assinatura para evitar resubscrições)
  const subscribeData = useMemo(
    () => service.onDataUpdate.bind(service),
    [service]
  )

  useWebSocketSubscription(
    subscribeData,
    (updates: (UpStatusMessage | LaneStatusMessage)[]) =>
      updateFromMessages(updates)
  )

  // 3. Sincronização e Cálculo Dinâmico dos Status das Células
  const cells = useMemo<MonitoringCell[]>(() => {
    if (nodes.length === 0) return []

    return nodes.map((node) => {
      const cellId = String(node.point.point.id)
      const associatedLanes = node.lanes

      // Usa as UPs resolvidas do node (que inclui mocks criados na metadata)
      const associatedUpIds =
        node.ups.length > 0
          ? node.ups.map((pu) => String(pu.id))
          : Array.from(
              new Set(
                associatedLanes
                  .map((l) => String(l.up_id || l.lane.up_id))
                  .filter((id) => id !== 'undefined' && id !== 'null')
              )
            )

      let maxLevel = 0
      let hasData = false
      let anyUpOffline = false
      // 1. Processa as UPs associadas
      associatedUpIds.forEach((upId) => {
        const data = upData.get(upId)
        const hasUpData = upData.has(upId)
        const isUpOffline = !hasUpData

        if (hasUpData) hasData = true
        if (isUpOffline) anyUpOffline = true

        const requestData = data?.request
        const items = requestData?.items || []
        items.forEach((group) => {
          group.elements.forEach((el) => {
            if (el.level > maxLevel) {
              maxLevel = el.level
            }
          })
        })
      })

      let anyLaneOffline = false
      // 2. Processa as Lanes associadas
      associatedLanes.forEach((laneDataObj) => {
        const laneId = String(laneDataObj.lane.id)
        const data = laneData.get(laneId)
        const hasLaneData = laneData.has(laneId)

        if (hasLaneData) {
          hasData = true
        } else {
          anyLaneOffline = true
        }

        const requestData = data?.request
        const items = requestData?.items || []
        items.forEach((group) => {
          group.elements?.forEach((el) => {
            if (el.level > maxLevel) {
              maxLevel = el.level
            }
          })
        })
      })

      // Regra de status: prioriza o maior level dos UPs e Lanes associados
      let status: MonitoringStatus = 'ok'
      if (maxLevel === 1) status = 'warning'
      else if (maxLevel >= 2) status = 'error'

      // Regra de conectividade: se qualquer UP ou Lane estiver offline, ou se não houver dados, prioriza como offline.
      const connectionStatus: MonitoringConnectionStatus =
        anyUpOffline || anyLaneOffline || !hasData ? 'offline' : 'online'

      return {
        id: cellId,
        name: node.point.point.name,
        status,
        connectionStatus,
        upIds: associatedUpIds,
        laneIds: associatedLanes.map((laneDataObj) => String(laneDataObj.lane.id))
      }
    })
  }, [nodes, upData, laneData])

  return {
    cells,
    isConnected,
    hasFailed,
    isReconnecting,
    reconnect,
    sendMessage: send,
    hasReceivedInitialData
  }
}
