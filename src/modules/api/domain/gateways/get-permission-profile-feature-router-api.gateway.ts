import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'

export interface GetPermissionProfileFeatureRouterApiGateway {
  execute(): Promise<PermissionProfileWithFeatureInterface[]>
}
