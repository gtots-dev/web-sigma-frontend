import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { UserEntity } from '../entities/user.entity'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PermissionsProfileIdsWithUserIdInterface {
  perm_profile_id: PermissionProfileEntity['id'][]
  user_id: UserEntity['id']
  contract_id: ContractEntity['id'][]
}
