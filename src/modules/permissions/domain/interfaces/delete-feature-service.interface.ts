import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from './permission-profiles.interface'
import type { FeaturesInterface } from './features.interface'

export interface DeleteFeatureServiceInterface {
  execute(
    token: TokenEntities,
    featureId: FeaturesInterface['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void>
}
