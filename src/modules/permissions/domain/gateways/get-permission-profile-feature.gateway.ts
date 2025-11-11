import type { PermissionProfileWithFeatureInterface } from '../interfaces/permission-profile-with-feature.interface'

export interface GetPermissionProfileFeatureGateway {
  execute(): Promise<PermissionProfileWithFeatureInterface[]>
}
