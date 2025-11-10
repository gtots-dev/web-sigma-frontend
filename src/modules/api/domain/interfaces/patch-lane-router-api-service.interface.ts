import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PatchLaneRouterApiServiceInterface {
  execute(lane: LaneEntity): Promise<void>
}
