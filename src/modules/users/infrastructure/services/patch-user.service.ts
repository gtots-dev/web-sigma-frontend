import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PatchUserGateway } from '../../domain/gateways/patch-user.gateway'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'
import type { UserEntity } from '../../domain/entities/user.entity'

export class PatchUserService implements PatchUserGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    user: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PATCH',
      url: `/operations/${this.params.operationId}/users/${user.get('id')}`,
      data: user,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    user: FormData
  ): Promise<HttpResponseInterface<UserEntity> | HttpResponseErrorInterface> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token, user)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
