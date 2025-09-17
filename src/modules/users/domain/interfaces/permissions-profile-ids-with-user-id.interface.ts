import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { UserEntity } from '../entities/user.entity'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PermissionsProfileIdsWithUserIdInterface {
  user_id: UserEntity['id']
  perm_profile_id: PermissionProfileEntity['id'][]
  profiles: {
    perm_profile_id: PermissionProfileEntity['id']
    contract_ids: ContractEntity['id'][]
  }[]
}
