import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { GetPermissionProfileFeatureRouterApiServiceInterface } from '../../domain/interfaces/get-permission-profile-feature-router-api-service.interface'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'

export class GetPermissionProfileFeatureRouterApiService
  implements GetPermissionProfileFeatureRouterApiServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    PermissionProfileId: PermissionProfileInterface['id']
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/permission/${PermissionProfileId}/feature`
    }
  }
  async execute(
    PermissionProfileId: PermissionProfileInterface['id']
  ): Promise<PermissionProfileWithFeatureInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(PermissionProfileId)
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
