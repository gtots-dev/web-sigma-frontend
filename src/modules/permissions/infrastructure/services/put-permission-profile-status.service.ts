import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileEntity } from '../../domain/entities/permission-profile.entity'
import type { PutPermissionProfileStatusServiceInterface } from '../../domain/interfaces/put-permission-profile-status-service.interface'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'
import { HttpResponsePermissionProfileValidator } from '../../domain/validators/http-response-permission-profile.validator'

export class PutPermissionProfileStatusService
  implements PutPermissionProfileStatusServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    permissionProfileId: PermissionProfileEntity['id'],
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): HttpRequestConfig<PermissionProfileEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/perm-profiles/${permissionProfileId}/status`,
      data: permissionProfileEnableAndDisable,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    permissionProfileId: PermissionProfileEntity['id'],
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      permissionProfileId,
      permissionProfileEnableAndDisable
    )
    const {
      success,
      status
    }: HttpResponse<PermissionProfileEnableAndDisableInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
