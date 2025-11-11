import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PatchLaneRouterApiGateway {
  execute(lane: LaneEntity): Promise<void>
}
