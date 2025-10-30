import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PutUserPermissionProfileAllInOneServiceInterface } from '../../domain/interfaces/put-user-permission-profiles-all-in-one-service.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserPermissionProfileWithFeaturesAndContractsInterface } from '../../domain/interfaces/user-permission-profile-with-features-and-contracts.interface'

export class PutUserPermissionProfileAllInOneService
  implements PutUserPermissionProfileAllInOneServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId }: UrlParams,
    token: TokenEntities,
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ): HttpRequestConfig {
    return {
      method: 'PUT',
      url: `/operations/${operationId}/users/${userId}/perm-profiles/all-in-one`,
      data: profiles,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      profiles
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
