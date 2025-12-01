import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PostPointLaneRouterApiGateway {
  execute(laneId: LaneEntity['id']): Promise<void>
}
