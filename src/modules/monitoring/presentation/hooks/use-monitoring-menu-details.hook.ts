import { useState, useEffect, useMemo } from 'react'
import { MonitoringCell } from '../../domain/interfaces/monitoring-cell.interface'
import { StatusGroup } from '../../domain/interfaces/monitoring-dashboard-websocket.interface'
import { useMonitoringDashboardStore } from '../stores/use-monitoring-dashboard.store'
import { useProcessingUnitStore } from '@/modules/processing-units/presentation/stores/processing-units.store'
import { useLaneStore } from '@/modules/lanes/presentation/stores/lanes.store'

export interface UpInfo {
  up_id: number
  name: string
  level: number
  items: StatusGroup[]
  hasData: boolean
  offline: boolean
}

export interface LaneInfo {
  lane_id: number
  up_id: number
  name: string
  level: number
  items: StatusGroup[]
  hasData: boolean
}

export type ActiveView =
  | { type: 'list' }
  | { type: 'up'; id: string }
  | { type: 'lane'; id: string }

export function useMonitoringMenuDetails(cell: MonitoringCell) {
  const [activeDialog, setActiveDialog] = useState<ActiveView>({ type: 'list' })
  const [accessing, setAccessing] = useState<{
    type: 'up' | 'lane'
    id: string
  } | null>(null)

  const upData = useMonitoringDashboardStore((state) => state.upData)
  const laneData = useMonitoringDashboardStore((state) => state.laneData)
  const { processingUnits } = useProcessingUnitStore()
  const { contractLanes } = useLaneStore()

  const { ups, lanes } = useMemo(() => {
    // 1. Mapeia as UPs da célula
    const parsedUps: UpInfo[] = cell.upIds.map((upId) => {
      const liveData = upData.get(upId)
      const hasUpData = upData.has(upId)
      const isUpOffline = !hasUpData
      const upEntity = processingUnits.find((pu) => String(pu.id) === String(upId))
      const name = upEntity?.name || `UP ${upId}`

      let maxLevel = 0
      const requestData = liveData?.request
      const items = requestData?.items || []
      items.forEach((group) => {
        group.elements.forEach((el) => {
          if (el.level > maxLevel) {
            maxLevel = el.level
          }
        })
      })

      return {
        up_id: Number(upId),
        name,
        level: maxLevel,
        items,
        hasData: hasUpData,
        offline: isUpOffline
      }
    })

    // 2. Mapeia as Lanes da célula
    const parsedLanes: LaneInfo[] = cell.laneIds.map((laneId) => {
      const liveData = laneData.get(laneId)
      const hasLaneData = laneData.has(laneId)
      const laneMeta = contractLanes.find((l) => String(l.lane.id) === String(laneId))
      const name = laneMeta?.lane.name || `Faixa ${laneId}`
      const upId = laneMeta ? (laneMeta.up_id || laneMeta.lane.up_id) : 0

      let maxLevel = 0
      const requestData = liveData?.request
      const items = requestData?.items || []
      items.forEach((group) => {
        group.elements?.forEach((el) => {
          if (el.level > maxLevel) {
            maxLevel = el.level
          }
        })
      })

      return {
        lane_id: Number(laneId),
        up_id: Number(upId),
        name,
        level: maxLevel,
        items,
        hasData: hasLaneData
      }
    })

    return { ups: parsedUps, lanes: parsedLanes }
  }, [cell.upIds, cell.laneIds, upData, laneData, processingUnits, contractLanes])

  // Se a célula selecionada mudar, fecha o modal anterior
  useEffect(() => {
    setActiveDialog({ type: 'list' })
    setAccessing(null)
  }, [cell.id])

  const handleAccess = (type: 'up' | 'lane', id: string) => {
    setAccessing({ type, id })
    setTimeout(() => {
      setActiveDialog({ type, id })
      setAccessing(null)
    }, 600)
  }

  const closeDialog = () => {
    setActiveDialog({ type: 'list' })
  }

  const isUpDialog = activeDialog.type === 'up'
  const dialogId = activeDialog.type !== 'list' ? activeDialog.id : ''

  const dialogItem = isUpDialog
    ? ups.find((u) => String(u.up_id) === String(dialogId))
    : lanes.find((l) => String(l.lane_id) === String(dialogId))

  const dialogData = {
    title: isUpDialog
      ? (dialogItem as UpInfo)?.name || `UP ${dialogId}`
      : (dialogItem as LaneInfo)?.name || `Faixa ${dialogId}`,
    hasData: dialogItem?.hasData || false,
    offline: isUpDialog ? (dialogItem as UpInfo)?.offline : false,
    level: dialogItem?.level || 0,
    items: dialogItem?.items || [],
    isUpDialog
  }

  return {
    ups,
    lanes,
    activeDialog,
    accessing,
    handleAccess,
    closeDialog,
    dialogData
  }
}
