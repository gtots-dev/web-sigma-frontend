import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface GetPermissionProfilesRouterApiGateway {
  execute(): Promise<HttpResponseInterface<PermissionProfileInterface[]>>
}
