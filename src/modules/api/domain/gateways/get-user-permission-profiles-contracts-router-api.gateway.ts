import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserPermissionProfileContractInterface } from '@/modules/users/domain/interfaces/user-permission-profile-contract.interface'

export interface GetUserPermissionProfileContractRouterApiGateway {
  execute(
    userId: UserEntity['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<UserPermissionProfileContractInterface[]>
}
