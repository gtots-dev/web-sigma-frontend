import { useMemo } from 'react'
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

export function useMonitoringMenuDetails(cell: MonitoringCell) {
  const upData = useMonitoringDashboardStore((state) => state.upData)
  const laneData = useMonitoringDashboardStore((state) => state.laneData)
  const { processingUnits } = useProcessingUnitStore()
  const { contractLanes } = useLaneStore()

  const { ups, lanes } = useMemo(() => {
    const parsedUps: UpInfo[] = cell.upIds.map((upId) => {
      const liveData = upData.get(upId)
      const hasUpData = upData.has(upId)
      const isUpOffline = !hasUpData
      const upEntity = processingUnits.find(
        (pu) => String(pu.id) === String(upId)
      )
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

    const parsedLanes: LaneInfo[] = cell.laneIds.map((laneId) => {
      const liveData = laneData.get(laneId)
      const hasLaneData = laneData.has(laneId)
      const laneMeta = contractLanes.find(
        (l) => String(l.lane.id) === String(laneId)
      )
      const name = laneMeta?.lane.name || `Faixa ${laneId}`
      const upId = laneMeta ? laneMeta.up_id || laneMeta.lane.up_id : 0

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
  }, [
    cell.upIds,
    cell.laneIds,
    upData,
    laneData,
    processingUnits,
    contractLanes
  ])

  return {
    ups,
    lanes
  }
}
