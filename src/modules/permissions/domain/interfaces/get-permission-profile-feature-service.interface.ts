import type { PermissionProfileWithFeatureInterface } from './permission-profile-with-feature.interface'

export interface GetPermissionProfileFeatureServiceInterface {
  execute(): Promise<PermissionProfileWithFeatureInterface[]>
}
