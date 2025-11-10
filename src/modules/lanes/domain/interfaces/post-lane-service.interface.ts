import type { LaneEntity } from '../entities/lane.entity'

export interface PostLaneServiceInterface {
  execute(laneEntity: LaneEntity): Promise<void>
}
