import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export interface GetLanesRouterApiServiceInterface {
  execute(): Promise<LaneEntity[]>
}
