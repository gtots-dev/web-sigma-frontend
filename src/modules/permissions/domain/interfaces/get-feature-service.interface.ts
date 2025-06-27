import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from './permission-profiles.interface'
import type { PermissionProfileWithFeatureInterface } from './permission-profile-with-feature.interface'

export interface GetFeatureServiceInterface {
  execute(
    token: TokenEntities,
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<PermissionProfileWithFeatureInterface[]>
}
