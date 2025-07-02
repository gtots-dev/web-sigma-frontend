import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { UserEntity } from '../entities/user.entity'

export interface PostBindUserWithPermissionProfileServiceInterface {
  execute(
    token: TokenEntities,
    permissionProfileIds: PermissionProfileInterface['id'][],
    userId: UserEntity['id']
  ): Promise<void>
}
