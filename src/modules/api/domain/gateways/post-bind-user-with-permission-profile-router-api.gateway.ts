import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface PostBindUserWithPermissionProfileRouterApiGateway {
  execute(
    userId: UserEntity['id'],
    permissionProfileIds: PermissionProfileInterface['id'][]
  ): Promise<void>
}
