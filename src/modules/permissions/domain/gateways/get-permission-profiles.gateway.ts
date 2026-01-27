import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '../interfaces/permission-profiles.interface'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

export interface GetPermissionProfilesGateway {
  execute(): Promise<
    | HttpResponseInterface<PermissionProfileInterface[]>
    | HttpResponseErrorInterface
  >
}
