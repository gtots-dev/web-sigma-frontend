import type { GetUserMeGateway } from '../../domain/gateways/get-user-me.gateway'
import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

import type { UserEntity } from '../../domain/entities/user.entity'
import type { UserPermissionsInterface } from '../../domain/interfaces/user-permissions.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class GetUserMeService implements GetUserMeGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider
  ) {}

  getHttpRequestConfig(token: TokenEntities): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/users/me`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<UserEntity & UserPermissionsInterface> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token)
    const {
      data
    }: HttpResponseInterface<UserEntity & UserPermissionsInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    return data
  }
}
