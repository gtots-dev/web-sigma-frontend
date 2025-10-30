import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'

export interface UserPermissionProfilesWithContracts {
  perm_profile_id: PermissionProfileEntity['id']
  contract_ids: ContractEntity['id'][]
}