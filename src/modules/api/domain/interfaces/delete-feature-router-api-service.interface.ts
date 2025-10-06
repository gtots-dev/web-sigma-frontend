import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export interface DeleteFeatureRouterApiServiceInterface {
  execute(
    features: FeaturesInterface['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void>
}
