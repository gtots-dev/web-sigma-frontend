import type { PermissionProfileAndFeaturesInterface } from './permission-profile-and-features'

export interface PostPermissionProfileAndFeaturesServiceInterface {
  execute(
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): Promise<void>
}
