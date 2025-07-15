import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface DeleteBindUserWithPermissionProfileRouterApiServiceInterface {
  execute(
    userId: UserEntity['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void>
}
