import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export interface PostPermissionProfileRouterApiServiceInterface {
  execute(
    permissionProfile: PermissionProfileInterface
  ): Promise<PermissionProfileEntity>
}
