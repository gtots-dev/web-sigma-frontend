import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetPermissionProfileFeatureGateway } from '../../domain/gateways/get-permission-profile-feature.gateway'
import type { PermissionProfileWithFeatureInterface } from '../../domain/interfaces/permission-profile-with-feature.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetPermissionProfileFeatureService
  implements GetPermissionProfileFeatureGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, permissionProfileId }: UrlParams
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/operations/${operationId}/perm-profiles/${permissionProfileId}/features`,
      requiresAuth: true
    }
  }

  async execute(): Promise<
    HttpResponseInterface<PermissionProfileWithFeatureInterface[]>
  > {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
