import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'
import type { GetFeatureRouterApiGateway } from '../../domain/gateways/get-feature-router-api.gateway'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class GetFeatureRouterApiService implements GetFeatureRouterApiGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: 'api/feature'
    }
  }

  async execute(): Promise<HttpResponseInterface<FeaturesInterface[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
