import type { LaneEntity } from "../entities/lane.entity";

export interface GetLanesServiceInterface {
  execute(): Promise<LaneEntity[]>
}
