import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PointLaneInterface {
  laneId: LaneEntity['id'][]
}
