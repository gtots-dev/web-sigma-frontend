import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetFeatureRouterApiGateway } from '../../domain/gateways/get-feature-router-api.gateway'
import { GetFeatureRouterApiService } from '../services/get-feature-router-api-service'

export class GetFeatureRouterApiFactory {
  static create(): GetFeatureRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetFeatureRouterApiService(executeRequest)
  }
}
