import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'

export interface PatchLaneStatusRouterApiGateway {
  execute(laneEnableAndDisabled: LaneEnableAndDisableInterface): Promise<void>
}
