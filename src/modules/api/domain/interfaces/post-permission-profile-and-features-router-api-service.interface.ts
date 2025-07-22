import type { PermissionProfileAndFeaturesInterface } from '@/modules/permissions/domain/interfaces/permission-profile-and-features'

export interface PostPermissionProfileAndFeaturesRouterApiServiceInterface {
  execute(
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): Promise<void>
}
