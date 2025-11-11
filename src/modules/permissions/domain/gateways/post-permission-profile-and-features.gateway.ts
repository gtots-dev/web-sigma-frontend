import type { PermissionProfileAndFeaturesInterface } from '../interfaces/permission-profile-and-features'

export interface PostPermissionProfileAndFeaturesGateway {
  execute(
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): Promise<void>
}
