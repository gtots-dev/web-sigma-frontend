import type { LaneEntity } from '../entities/lane.entity'

export interface PatchLaneServiceInterface {
  execute(LaneEntity: LaneEntity): Promise<void>
}
