import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { UserEntity } from '../entities/user.entity'

export interface PermissionsProfileIdsWithUserIdInterface {
  perm_profile_id: PermissionProfileEntity['id'][]
  user_id: UserEntity['id']
}
