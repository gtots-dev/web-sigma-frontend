import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { UserEntity } from '../entities/user.entity'
import type { UserPermissionProfilesWithContracts } from './user-permission-profile-id-with-contracts.interface'

export interface PermissionsProfileIdsWithUserIdInterface {
  user_id: UserEntity['id']
  perm_profile_id: PermissionProfileEntity['id'][]
  profiles: UserPermissionProfilesWithContracts[]
}
