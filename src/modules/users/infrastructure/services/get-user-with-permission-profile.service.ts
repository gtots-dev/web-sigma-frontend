import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import type { GetUserWithPermissionProfileGateway } from '../../domain/gateways/get-user-with-permission-profile.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class GetUserWithPermissionProfileService implements GetUserWithPermissionProfileGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId }: UrlParams,
    token: TokenEntities
  ): HttpRequestConfig<FormData> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/users/${userId}/perm-profiles`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<PermissionProfileWithUserInterface[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, token)
    const {
      data
    }: HttpResponseInterface<PermissionProfileWithUserInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
