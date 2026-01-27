import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PatchUserStatusGateway } from '../../domain/gateways/patch-user-status.gateway'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserEnableAndDisableInterface } from '../../domain/interfaces/user-enable-and-disable.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

export class PatchUserStatusService implements PatchUserStatusGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userEnableAndDisable: UserEnableAndDisableInterface
  ): HttpRequestConfig<UserEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${this.params.operationId}/users/${userEnableAndDisable.id}/status`,
      data: userEnableAndDisable,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    userEnableAndDisable: UserEnableAndDisableInterface
  ): Promise<HttpResponseInterface<void> | HttpResponseErrorInterface> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      userEnableAndDisable
    )
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
