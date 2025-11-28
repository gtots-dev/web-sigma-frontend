import type { PointLaneInterface } from '../interfaces/point-lane.interface'

export interface PostPointLaneGateway {
  execute(laneId: PointLaneInterface): Promise<void>
}
