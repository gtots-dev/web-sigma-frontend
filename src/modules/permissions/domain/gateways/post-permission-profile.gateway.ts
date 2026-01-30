import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '../interfaces/permission-profiles.interface'

export interface PostPermissionProfileGateway {
  execute(
    permissionProfile: PermissionProfileInterface
  ): Promise<HttpResponseInterface<PermissionProfileInterface>>
}
