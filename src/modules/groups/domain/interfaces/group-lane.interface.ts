import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface GroupLaneInterface {
  laneId: LaneEntity['id'][]
}
