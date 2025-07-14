import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileAndFeaturesInterface } from './permission-profile-and-features'

export interface PostPermissionProfileAndFeaturesServiceInterface {
  execute(
    token: TokenEntities,
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): Promise<void>
}
