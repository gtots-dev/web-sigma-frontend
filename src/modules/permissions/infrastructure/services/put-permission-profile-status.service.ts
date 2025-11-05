import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PatchPermissionProfileStatusServiceInterface } from '../../domain/interfaces/put-permission-profile-status-service.interface'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'
import { HttpResponsePermissionProfileValidator } from '../../domain/validators/http-response-permission-profile.validator'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchPermissionProfileStatusService
  implements PatchPermissionProfileStatusServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, permissionProfileId }: UrlParams,
    token: TokenEntities,
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): HttpRequestConfig<PermissionProfileEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/perm-profiles/${permissionProfileId}/status`,
      data: permissionProfileEnableAndDisable,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
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
