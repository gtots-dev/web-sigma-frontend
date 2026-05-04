import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostPermissionProfileAndFeaturesGateway } from '../../domain/gateways/post-permission-profile-and-features.gateway'
import type { PermissionProfileAndFeaturesInterface } from '../../domain/interfaces/permission-profile-and-features'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPermissionProfileAndFeaturesService
  implements PostPermissionProfileAndFeaturesGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId }: UrlParams,
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): HttpRequestConfig<PermissionProfileAndFeaturesInterface> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/perm-profiles/all-in-one`,
      data: permissionProfileAndFeatures,
      requiresAuth: true
    }
  }

  async execute(
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, permissionProfileAndFeatures
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
