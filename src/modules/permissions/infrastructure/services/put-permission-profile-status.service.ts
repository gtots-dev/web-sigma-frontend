import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PatchPermissionProfileStatusGateway } from '../../domain/gateways/put-permission-profile-status.gateway'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchPermissionProfileStatusService
  implements PatchPermissionProfileStatusGateway
{
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
      url: `/operations/${operationId}/perm-profiles/${permissionProfileId}/status`,
      data: permissionProfileEnableAndDisable,
      requiresAuth: true
    }
  }

  async execute(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, permissionProfileEnableAndDisable
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
