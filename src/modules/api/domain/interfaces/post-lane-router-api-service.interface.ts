import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PostLaneRouterApiServiceInterface {
  execute(lane: LaneEntity): Promise<void>
}
