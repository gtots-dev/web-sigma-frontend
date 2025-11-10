import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PutUserPermissionProfileAllInOneRouterApiGateway } from '../../domain/gateways/put-user-permission-profiles-all-in-one-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserPermissionProfileWithFeaturesAndContractsInterface } from '@/modules/users/domain/interfaces/user-permission-profile-with-features-and-contracts.interface'

export class PutUserPermissionProfileAllInOneRouterApiService
  implements PutUserPermissionProfileAllInOneRouterApiGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, userId }: UrlParams,
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ): HttpRequestConfig {
    return {
      method: 'PUT',
      data: profiles,
      url: `api/operations/${operationId}/users/${userId}/permission-profiles/all-in-one`
    }
  }
  async execute(
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, profiles)
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
