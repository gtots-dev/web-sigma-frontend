import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PostPermissionProfileAndFeaturesRouterApiServiceInterface } from '../../domain/interfaces/post-permission-profile-and-features-router-api-service.interface'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { PermissionProfileAndFeaturesInterface } from '@/modules/permissions/domain/interfaces/permission-profile-and-features'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPermissionProfileAndFeaturesRouterApiService
  implements PostPermissionProfileAndFeaturesRouterApiServiceInterface
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
      data: permissionProfileAndFeatures,
      url: `api/operations/${operationId}/permissions/all-in-one`
    }
  }
  async execute(
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      permissionProfileAndFeatures
    )
    const {
      success,
      status
    }: HttpResponse<PermissionProfileAndFeaturesInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
