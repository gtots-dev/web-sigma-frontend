import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PatchUserStatusGateway } from '../../domain/gateways/patch-user-status.gateway'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserEnableAndDisableInterface } from '../../domain/interfaces/user-enable-and-disable.interface'

export class PatchUserStatusService implements PatchUserStatusGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId }: UrlParams,
    token: TokenEntities,
    userEnableAndDisable: UserEnableAndDisableInterface
  ): HttpRequestConfig<UserEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/users/${userEnableAndDisable.id}/status`,
      data: userEnableAndDisable,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    userEnableAndDisable: UserEnableAndDisableInterface
  ): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      userEnableAndDisable
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
