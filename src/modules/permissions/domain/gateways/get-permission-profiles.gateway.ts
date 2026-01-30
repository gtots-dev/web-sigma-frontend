import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '../interfaces/permission-profiles.interface'
export interface GetPermissionProfilesGateway {
  execute(): Promise<HttpResponseInterface<PermissionProfileInterface[]>>
}
