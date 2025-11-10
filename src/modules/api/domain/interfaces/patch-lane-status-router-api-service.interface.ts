import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'

export interface PatchLaneStatusRouterApiServiceInterface {
  execute(laneEnableAndDisabled: LaneEnableAndDisableInterface): Promise<void>
}
