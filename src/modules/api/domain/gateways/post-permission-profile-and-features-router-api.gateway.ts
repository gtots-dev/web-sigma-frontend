import type { PermissionProfileAndFeaturesInterface } from '@/modules/permissions/domain/interfaces/permission-profile-and-features'

export interface PostPermissionProfileAndFeaturesRouterApiGateway {
  execute(
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): Promise<void>
}
