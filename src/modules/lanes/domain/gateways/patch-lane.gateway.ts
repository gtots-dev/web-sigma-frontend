import type { LaneEntity } from '../entities/lane.entity'

export interface PatchLaneGateway {
  execute(LaneEntity: LaneEntity): Promise<void>
}
