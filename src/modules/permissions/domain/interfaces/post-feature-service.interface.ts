import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from './permission-profiles.interface'

export interface PostFeatureServiceInterface {
  execute(
    token: TokenEntities,
    features: number[],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void>
}
