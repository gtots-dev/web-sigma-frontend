import type { PermissionProfileEnableAndDisableInterface } from './permission-profile-enable-and-disable.interface'
export interface PatchPermissionProfileStatusServiceInterface {
  execute(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void>
}
