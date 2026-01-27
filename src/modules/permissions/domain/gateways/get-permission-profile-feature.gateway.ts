import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileWithFeatureInterface } from '../interfaces/permission-profile-with-feature.interface'
export interface GetPermissionProfileFeatureGateway {
  execute(): Promise<
    HttpResponseInterface<PermissionProfileWithFeatureInterface[]>
  >
}
