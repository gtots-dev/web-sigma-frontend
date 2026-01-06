import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { UserInterface } from '../../domain/interfaces/user.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

import type { GetUsersGateway } from '../../domain/gateways/get-users.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class GetUsersService implements GetUsersGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    { operationId }: UrlParams
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/users`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<UserInterface[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token, this.params)
    const { data }: HttpResponseInterface<UserInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
