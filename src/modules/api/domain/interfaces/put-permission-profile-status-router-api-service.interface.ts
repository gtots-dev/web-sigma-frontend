import type { PermissionProfileEnableAndDisableInterface } from '@/modules/permissions/domain/interfaces/permission-profile-enable-and-disable.interface'

export interface PatchPermissionProfileStatusRouterApiServiceInterface {
  execute(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void>
}
