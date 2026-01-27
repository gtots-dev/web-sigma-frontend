import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '../interfaces/permission-profiles.interface'
import type { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export interface PostPermissionProfileGateway {
  execute(
    permissionProfile: PermissionProfileInterface
  ): Promise<
    HttpResponseInterface<PermissionProfileInterface[]> | HttpResponseError
  >
}
