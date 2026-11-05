'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { usePointStore } from '@/modules/points/presentation/stores/point.store'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'
import { useProcessingUnitStore } from '@/modules/processing-units/presentation/stores/processing-units.store'
import { useMonitoringDashboardStore } from '../stores/use-monitoring-dashboard.store'
import {
  useMonitoringUnifiedNodes,
  type UnifiedMonitoringNode
} from './use-monitoring-unified-nodes.hook'
import type {
  MonitoringCell,
  MonitoringConnectionStatus,
  MonitoringStatus
} from '../../domain/interfaces/monitoring-cell.interface'
import type {
  LaneStatusMessage,
  StatusGroup,
  UpStatusMessage
} from '../../domain/interfaces/monitoring-dashboard-websocket.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

function buildCellFromNode(
  node: UnifiedMonitoringNode | undefined,
  upData: Map<string, UpStatusMessage>,
  laneData: Map<string, LaneStatusMessage>
): MonitoringCell | undefined {
  if (!node) return undefined

  const cellId = String(node.point.point.id)
  const associatedLanes = node.lanes
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

  associatedUpIds.forEach((upId) => {
    const data = upData.get(upId)
    const hasUpData = upData.has(upId)
    if (hasUpData) hasData = true
    else anyUpOffline = true

    const items = data?.request?.items || []
    items.forEach((group) => {
      group.elements.forEach((el) => {
        if (el.level > maxLevel) maxLevel = el.level
      })
    })
  })

  let anyLaneOffline = false
  associatedLanes.forEach((laneDataObj) => {
    const laneId = String(laneDataObj.lane.id)
    const data = laneData.get(laneId)
    const hasLaneData = laneData.has(laneId)
    if (hasLaneData) hasData = true
    else anyLaneOffline = true

    const items = data?.request?.items || []
    items.forEach((group) => {
      group.elements?.forEach((el) => {
        if (el.level > maxLevel) maxLevel = el.level
      })
    })
  })

  let status: MonitoringStatus = 'ok'
  if (maxLevel === 1) status = 'warning'
  else if (maxLevel >= 2) status = 'error'

  const connectionStatus: MonitoringConnectionStatus =
    anyUpOffline || anyLaneOffline || !hasData ? 'offline' : 'online'

  const rawPoint = node.point.point
  const parsedLat =
    rawPoint.latitude !== undefined &&
    rawPoint.latitude !== null &&
    rawPoint.latitude !== ''
      ? Number(rawPoint.latitude)
      : undefined
  const parsedLng =
    rawPoint.longitude !== undefined &&
    rawPoint.longitude !== null &&
    rawPoint.longitude !== ''
      ? Number(rawPoint.longitude)
      : undefined

  return {
    id: cellId,
    name: rawPoint.name,
    status,
    connectionStatus,
    upIds: associatedUpIds,
    laneIds: associatedLanes.map((l) => String(l.lane.id)),
    latitude:
      parsedLat !== undefined && !isNaN(parsedLat) ? parsedLat : undefined,
    longitude:
      parsedLng !== undefined && !isNaN(parsedLng) ? parsedLng : undefined
  }
}

function useEnsureMonitoringMetadata() {
  const { operationId, contractId }: UrlParams = useParams()
  const { points, loading: loadingPoints, getPoints } = usePointStore()
  const { contractLanes, getContractLanes } = useLaneStore()
  const {
    processingUnits,
    loading: loadingUnits,
    getProcessingUnits
  } = useProcessingUnitStore()
  const [fetching, setFetching] = useState(
    points.length === 0 &&
      contractLanes.length === 0 &&
      processingUnits.length === 0
  )

  useEffect(() => {
    let active = true

    if (
      operationId &&
      contractId &&
      points.length === 0 &&
      contractLanes.length === 0 &&
      processingUnits.length === 0 &&
      !loadingPoints &&
      !loadingUnits
    ) {
      setFetching(true)
      Promise.all([
        getPoints({ operationId, contractId }).catch(() => undefined),
        getContractLanes({ operationId, contractId }).catch(() => undefined),
        getProcessingUnits({ operationId, contractId }).catch(() => undefined)
      ]).finally(() => {
        if (active) setFetching(false)
      })
    } else if (!loadingPoints && !loadingUnits) {
      setFetching(false)
    }

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationId, contractId, loadingPoints, loadingUnits])

  const unifiedNodes = useMonitoringUnifiedNodes({
    points,
    contractLanes,
    processingUnits,
    contractId: String(contractId ?? '')
  })

  return {
    points,
    contractLanes,
    processingUnits,
    unifiedNodes,
    loading: fetching || loadingPoints || loadingUnits
  }
}

export function useMonitoringProcessingUnitById(processingUnitId: number) {
  const { processingUnits, unifiedNodes, loading } =
    useEnsureMonitoringMetadata()
  const upData = useMonitoringDashboardStore((state) => state.upData)
  const laneData = useMonitoringDashboardStore((state) => state.laneData)

  return useMemo(() => {
    const processingUnit =
      processingUnits.find((pu) => Number(pu.id) === processingUnitId) ?? null
    const upKey = String(processingUnitId)
    const liveData = upData.get(upKey)
    const hasData = upData.has(upKey)
    const offline = !hasData

    let level = 0
    const items: StatusGroup[] = liveData?.request?.items || []
    items.forEach((group) => {
      group.elements.forEach((el) => {
        if (el.level > level) level = el.level
      })
    })

    const node = unifiedNodes.find((n) =>
      n.ups.some((u) => Number(u.id) === processingUnitId)
    )
    const cell = buildCellFromNode(node, upData, laneData)

    return {
      processingUnit,
      cell,
      title: processingUnit?.name || `UP ${processingUnitId}`,
      hasData,
      offline,
      level,
      items,
      loading
    }
  }, [
    processingUnits,
    processingUnitId,
    upData,
    laneData,
    unifiedNodes,
    loading
  ])
}

export function useMonitoringLaneById(laneId: number) {
  const { contractLanes, unifiedNodes, loading } = useEnsureMonitoringMetadata()
  const upData = useMonitoringDashboardStore((state) => state.upData)
  const laneData = useMonitoringDashboardStore((state) => state.laneData)

  return useMemo(() => {
    const laneMeta =
      contractLanes.find((l) => Number(l.lane.id) === laneId) ?? null
    const laneKey = String(laneId)
    const liveData = laneData.get(laneKey)
    const hasData = laneData.has(laneKey)

    let level = 0
    const items: StatusGroup[] = liveData?.request?.items || []
    items.forEach((group) => {
      group.elements?.forEach((el) => {
        if (el.level > level) level = el.level
      })
    })

    const node = unifiedNodes.find((n) =>
      n.lanes.some((l) => Number(l.lane.id) === laneId)
    )
    const cell = buildCellFromNode(node, upData, laneData)

    return {
      lane: laneMeta?.lane ?? null,
      cell,
      title: laneMeta?.lane.name || `Faixa ${laneId}`,
      hasData,
      offline: false,
      level,
      items,
      loading
    }
  }, [contractLanes, laneId, upData, laneData, unifiedNodes, loading])
}
