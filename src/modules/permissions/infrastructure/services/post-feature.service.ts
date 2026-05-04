import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostFeatureGateway } from '../../domain/gateways/post-feature.gateway'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostFeatureService implements PostFeatureGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, permissionProfileId }: UrlParams,
    features: FeaturesInterface['id'][]
  ): HttpRequestConfig<{ feature_id: FeaturesInterface['id'][] }> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/perm-profiles/${permissionProfileId}/features`,
      data: {
        feature_id: features
      },
      requiresAuth: true
    }
  }

  async execute(features: FeaturesInterface['id'][]): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, features
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
