import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileEntity } from '../entities/permission-profile.entity'
export interface PutPermissionProfileStatusServiceInterface {
  execute(
    token: TokenEntities,
    permissionProfileId: PermissionProfileEntity['id'],
    permissionProfileEnableAndDisable: FormData
  ): Promise<void>
}
