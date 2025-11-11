import type { LaneEntity } from '../entities/lane.entity'

export interface PostLaneGateway {
  execute(laneEntity: LaneEntity): Promise<void>
}
