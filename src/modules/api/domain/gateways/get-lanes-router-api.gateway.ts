import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface GetLanesRouterApiGateway {
  execute(): Promise<LaneEntity[]>
}
