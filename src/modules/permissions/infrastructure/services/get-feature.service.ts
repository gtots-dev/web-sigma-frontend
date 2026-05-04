import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'
import type { GetFeatureGateway } from '../../domain/gateways/get-feature.gateway'

export class GetFeatureService implements GetFeatureGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/features`,
      requiresAuth: true
    }
  }

  async execute(): Promise<HttpResponseInterface<FeaturesInterface[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
