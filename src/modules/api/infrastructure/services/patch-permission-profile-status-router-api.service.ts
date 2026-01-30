import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PatchPermissionProfileStatusRouterApiGateway } from '../../domain/gateways/put-permission-profile-status-router-api.gateway'
import type { PermissionProfileEnableAndDisableInterface } from '@/modules/permissions/domain/interfaces/permission-profile-enable-and-disable.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchPermissionProfileStatusRouterApiService implements PatchPermissionProfileStatusRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, permissionProfileId }: UrlParams,
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): HttpRequestConfig<PermissionProfileEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      data: permissionProfileEnableAndDisable,
      url: `api/operations/${operationId}/permissions/${permissionProfileId}/status`
    }
  }
  async execute(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      permissionProfileEnableAndDisable
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
