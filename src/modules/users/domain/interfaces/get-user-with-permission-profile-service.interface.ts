import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../entities/user.entity'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'

export interface GetUserWithPermissionProfileServiceInterface {
  execute(
    token: TokenEntities,
    userId: UserEntity['id']
  ): Promise<PermissionProfileWithUserInterface[]>
}
