import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export interface GetFeatureRouterApiServiceInterface {
  execute(
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<PermissionProfileWithFeatureInterface[]>
}
