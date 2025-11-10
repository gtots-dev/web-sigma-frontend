import type { LaneEntity } from "../entities/lane.entity";

export interface GetLanesGateway {
  execute(): Promise<LaneEntity[]>
}
