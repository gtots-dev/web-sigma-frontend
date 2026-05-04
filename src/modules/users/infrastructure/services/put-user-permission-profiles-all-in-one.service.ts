import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PutUserPermissionProfileAllInOneGateway } from '../../domain/gateways/put-user-permission-profiles-all-in-one.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserPermissionProfileWithFeaturesAndContractsInterface } from '../../domain/interfaces/user-permission-profile-with-features-and-contracts.interface'

export class PutUserPermissionProfileAllInOneService
  implements PutUserPermissionProfileAllInOneGateway
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
      url: `/operations/${operationId}/users/${userId}/perm-profiles/all-in-one`,
      data: profiles,
      requiresAuth: true
    }
  }

  async execute(
    profiles: UserPermissionProfileWithFeaturesAndContractsInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, profiles
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
