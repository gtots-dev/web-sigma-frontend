import type { PointEnableAndDisableInterface } from '../interfaces/point-enable-and-disable.interface'

export interface PatchPointStatusGateway {
  execute(
    pointEnabledAndDisabled: PointEnableAndDisableInterface
  ): Promise<void>
}
