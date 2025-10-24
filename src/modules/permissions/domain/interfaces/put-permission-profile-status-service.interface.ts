import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileEntity } from '../entities/permission-profile.entity'
import type { PermissionProfileEnableAndDisableInterface } from './permission-profile-enable-and-disable.interface'
export interface PutPermissionProfileStatusServiceInterface {
  execute(
    token: TokenEntities,
    permissionProfileId: PermissionProfileEntity['id'],
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void>
}
