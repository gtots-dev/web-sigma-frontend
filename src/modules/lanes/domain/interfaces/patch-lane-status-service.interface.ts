import type { LaneEnableAndDisableInterface } from './lane-enable-and-disable.interface'

export interface PatchLaneStatusServiceInterface {
  execute(laneEnableAndDisabled: LaneEnableAndDisableInterface): Promise<void>
}
