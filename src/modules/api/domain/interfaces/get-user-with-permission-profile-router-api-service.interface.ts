import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface GetUserWithPermissionProfileRouterApiServiceInterface {
  execute(
    userId: UserEntity['id']
  ): Promise<PermissionProfileWithUserInterface[]>
}
