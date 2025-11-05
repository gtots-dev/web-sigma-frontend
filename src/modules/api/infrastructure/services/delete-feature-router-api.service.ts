import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { DeleteFeatureRouterApiServiceInterface } from '../../domain/interfaces/delete-feature-router-api-service.interface'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteFeatureRouterApiService
  implements DeleteFeatureRouterApiServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    permissionProfileId,
    operationId,
    featureId
  }: UrlParams): HttpRequestConfig<number[]> {
    return {
      method: 'DELETE',
      url: `api/operations/${operationId}/permissions/${permissionProfileId}/features/${featureId}`
    }
  }
  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, status }: HttpResponse<PermissionProfileEntity> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
