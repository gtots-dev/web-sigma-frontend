import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { GetPermissionProfilesGateway } from '../../domain/gateways/get-permission-profiles.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
export class GetPermissionProfilesService
  implements GetPermissionProfilesGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/operations/${this.params.operationId}/perm-profiles`,
      requiresAuth: true
    }
  }

  async execute(): Promise<
    HttpResponseInterface<PermissionProfileInterface[]>
  > {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
