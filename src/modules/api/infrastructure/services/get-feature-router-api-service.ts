import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'
import type { GetFeatureRouterApiGateway } from '../../domain/gateways/get-feature-router-api.gateway'

export class GetFeatureRouterApiService implements GetFeatureRouterApiGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: 'api/feature'
    }
  }

  async execute(): Promise<FeaturesInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { data }: HttpResponseInterface<FeaturesInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
