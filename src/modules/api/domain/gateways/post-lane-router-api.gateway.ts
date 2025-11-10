import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PostLaneRouterApiGateway {
  execute(lane: LaneEntity): Promise<void>
}
