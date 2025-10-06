import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'
import type { GetFeatureRouterApiServiceInterface } from '../../domain/interfaces/get-feature-router-api-service.interface'

export class GetFeatureRouterApiService
  implements GetFeatureRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: 'api/feature'
    }
  }

  async execute(): Promise<FeaturesInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { data }: HttpResponse<FeaturesInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
