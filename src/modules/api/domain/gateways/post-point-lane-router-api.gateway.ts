import type { PointLaneInterface } from '@/modules/points/domain/interfaces/point-lane.interface'

export interface PostPointLaneRouterApiGateway {
  execute(laneId: PointLaneInterface): Promise<void>
}
