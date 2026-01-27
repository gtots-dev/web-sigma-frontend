import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetPermissionProfileFeatureRouterApiGateway } from '../../domain/gateways/get-permission-profile-feature-router-api.gateway'
import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetPermissionProfileFeatureRouterApiService
  implements GetPermissionProfileFeatureRouterApiGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${this.params.operationId}/permissions/${this.params.permissionProfileId}/features`
    }
  }
  async execute(): Promise<
    HttpResponseInterface<PermissionProfileWithFeatureInterface[]>
  > {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
