import { useMemo } from 'react'
import type { PointWithGroupInterface } from '@/modules/points/domain/interfaces/point-with-group.interface'
import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface UnifiedMonitoringNode {
  point: PointWithGroupInterface
  lanes: LaneWithPointAndGroupInterface[]
  ups: ProcessingUnitEntity[]
}

interface UseMonitoringUnifiedNodesProps {
  points: PointWithGroupInterface[] | null
  contractLanes: LaneWithPointAndGroupInterface[] | null
  processingUnits: ProcessingUnitEntity[]
  contractId: string
}

export function useMonitoringUnifiedNodes({
  points,
  contractLanes,
  processingUnits,
  contractId
}: UseMonitoringUnifiedNodesProps) {
  return useMemo<UnifiedMonitoringNode[]>(() => {
    if (!points || !contractLanes) return []

    return points.map((pointWithGroup) => {
      const associatedLanes = contractLanes.filter(
        (laneData) => laneData.point_id === pointWithGroup.point.id
      )

      let associatedUpIds = Array.from(
        new Set(
          associatedLanes
            .map((l) => String(l.up_id || l.lane.up_id))
            .filter((id) => id !== 'undefined' && id !== 'null')
        )
      )

      if (associatedUpIds.length === 0 && associatedLanes.length > 0) {
        console.warn(`Ponto ${pointWithGroup.point.name} (ID: ${pointWithGroup.point.id}) possui faixas associadas, mas nenhuma UP vinculada.`)
      }

      let associatedUps = processingUnits.filter(
        (pu) => pu.id !== undefined && associatedUpIds.includes(String(pu.id))
      )

      return {
        point: pointWithGroup,
        lanes: associatedLanes,
        ups: associatedUps
      }
    }).filter((node) => node.ups.length > 0)
  }, [points, contractLanes, processingUnits, contractId])
}
