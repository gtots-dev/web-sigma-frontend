import type { LaneEnableAndDisableInterface } from './lane-enable-and-disable.interface'

export interface PatchLaneStatusGateway {
  execute(laneEnableAndDisabled: LaneEnableAndDisableInterface): Promise<void>
}
