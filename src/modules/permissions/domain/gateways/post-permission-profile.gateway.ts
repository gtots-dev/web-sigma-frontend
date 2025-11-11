import type { PermissionProfileInterface } from '../interfaces/permission-profiles.interface'

export interface PostPermissionProfileGateway {
  execute(
    permissionProfile: PermissionProfileInterface
  ): Promise<PermissionProfileInterface>
}
