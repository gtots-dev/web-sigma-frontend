import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { DeleteFeatureRouterApiServiceInterface } from '../../domain/interfaces/delete-feature-router-api-service.interface'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'

export class DeleteFeatureRouterApiService
  implements DeleteFeatureRouterApiServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    feature: FeaturesInterface['id'],
    PermissionProfileId: PermissionProfileInterface['id']
  ): HttpRequestConfig<number[]> {
    return {
      method: 'DELETE',
      url: `api/permission/${PermissionProfileId}/feature/${feature}`
    }
  }
  async execute(
    feature: FeaturesInterface['id'],
    PermissionProfileId: PermissionProfileInterface['id']
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      feature,
      PermissionProfileId
    )
    const { success, status }: HttpResponse<PermissionProfileEntity> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
