import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { GetPermissionProfileFeatureGateway } from '../../domain/gateways/get-permission-profile-feature.gateway'
import type { PermissionProfileWithFeatureInterface } from '../../domain/interfaces/permission-profile-with-feature.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetPermissionProfileFeatureService
  implements GetPermissionProfileFeatureGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, permissionProfileId }: UrlParams,
    token: TokenEntities
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/operations/${operationId}/perm-profiles/${permissionProfileId}/features`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<PermissionProfileWithFeatureInterface[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, token)
    const {
      data
    }: HttpResponseInterface<PermissionProfileWithFeatureInterface[]> =
      await this.httpRequest.execute(settingsAuthHTTP)
    return data
  }
}
