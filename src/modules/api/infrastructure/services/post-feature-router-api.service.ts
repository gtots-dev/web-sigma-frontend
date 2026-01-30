import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostFeatureRouterApiGateway } from '../../domain/gateways/post-feature-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostFeatureRouterApiService implements PostFeatureRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    features: number[],
    { permissionProfileId, operationId }: UrlParams
  ): HttpRequestConfig<number[]> {
    return {
      method: 'POST',
      data: features,
      url: `api/operations/${operationId}/permissions/${permissionProfileId}/features`
    }
  }
  async execute(features: number[]): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(features, this.params)
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
