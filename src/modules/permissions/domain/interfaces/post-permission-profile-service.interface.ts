import type { PermissionProfileInterface } from './permission-profiles.interface'

export interface PostPermissionProfileServiceInterface {
  execute(
    permissionProfile: PermissionProfileInterface
  ): Promise<PermissionProfileInterface>
}
