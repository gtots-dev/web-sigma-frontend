import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../entities/user.entity'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PutUserPermissionProfileAllInOneServiceInterface {
  execute(
    token: TokenEntities,
    userId: UserEntity['id'],
    profiles: {
      profiles: {
        perm_profile_id: PermissionProfileEntity['id']
        contract_ids: ContractEntity['id'][]
      }[]
    }
  ): Promise<void>
}
