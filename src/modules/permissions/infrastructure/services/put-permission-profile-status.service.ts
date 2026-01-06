import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PatchPermissionProfileStatusGateway } from '../../domain/gateways/put-permission-profile-status.gateway'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchPermissionProfileStatusService
  implements PatchPermissionProfileStatusGateway
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

    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
