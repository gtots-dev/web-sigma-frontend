import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface PutUserPermissionProfileAllInOneRouterApiServiceInterface {
  execute(
    userId: UserEntity['id'],
    profiles: {
      profiles: {
        perm_profile_id: PermissionProfileEntity['id']
        contract_ids: ContractEntity['id'][]
      }[]
    }
  ): Promise<void>
}
