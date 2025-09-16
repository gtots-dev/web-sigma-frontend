import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserPermissionProfileContractInterface } from '@/modules/users/domain/interfaces/user-permission-profile-contract.interface'
import type { UserEntity } from '../entities/user.entity'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export interface GetUserPermissionProfileContractServiceInterface {
  execute(
    token: TokenEntities,
    userId: UserEntity['id'],
    userPermissionProfileId: PermissionProfileInterface['id']
  ): Promise<UserPermissionProfileContractInterface[]>
}
