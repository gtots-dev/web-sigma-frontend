import type { PermissionProfileEnableAndDisableInterface } from '../interfaces/permission-profile-enable-and-disable.interface'
export interface PatchPermissionProfileStatusGateway {
  execute(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void>
}
