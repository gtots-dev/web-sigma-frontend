import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export interface PostFeatureRouterApiServiceInterface {
  execute(
    features: number[],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void>
}
