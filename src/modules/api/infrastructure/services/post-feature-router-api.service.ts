import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { PostFeatureRouterApiServiceInterface } from '../../domain/interfaces/post-feature-router-api-service.interface'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'

export class PostFeatureRouterApiService
  implements PostFeatureRouterApiServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    features: FeaturesInterface['id'][],
    PermissionProfileId: PermissionProfileInterface['id']
  ): HttpRequestConfig<{ feature_id: FeaturesInterface['id'][] }> {
    return {
      method: 'POST',
      data: {
        feature_id: features
      },
      url: `api/permission/${PermissionProfileId}/feature`
    }
  }
  async execute(
    features: number[],
    PermissionProfileId: PermissionProfileInterface['id']
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      features,
      PermissionProfileId
    )
    const { success, status }: HttpResponse<PermissionProfileEntity> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
