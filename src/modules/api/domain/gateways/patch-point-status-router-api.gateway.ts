import type { PointEnableAndDisableInterface } from '@/modules/points/domain/interfaces/point-enable-and-disable.interface'

export interface PatchPointStatusRouterApiGateway {
  execute(pointEnableAndDisabled: PointEnableAndDisableInterface): Promise<void>
}
