import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetPermissionProfileFeatureRouterApiServiceInterface } from '../../domain/interfaces/get-permission-profile-feature-router-api-service.interface'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetPermissionProfileFeatureRouterApiService
  implements GetPermissionProfileFeatureRouterApiServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    permissionProfileId,
    operationId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/permissions/${permissionProfileId}/features`
    }
  }
  async execute(): Promise<PermissionProfileWithFeatureInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const {
      success,
      data,
      status
    }: HttpResponse<PermissionProfileWithFeatureInterface[]> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
    return data
  }
}
