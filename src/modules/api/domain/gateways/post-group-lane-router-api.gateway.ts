import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface PostGroupLaneRouterApiGateway {
  execute(laneId: LaneEntity['id']): Promise<void>
}
