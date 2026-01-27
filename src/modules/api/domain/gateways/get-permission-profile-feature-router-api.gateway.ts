import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface GetPermissionProfileFeatureRouterApiGateway {
  execute(): Promise<
    HttpResponseInterface<PermissionProfileWithFeatureInterface[]>
  >
}
