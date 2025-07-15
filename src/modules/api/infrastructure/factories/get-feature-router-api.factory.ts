import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetFeatureRouterApiService } from '../services/get-feature-router-api.service'
import type { GetFeatureRouterApiServiceInterface } from '../../domain/interfaces/get-feature-router-api-service.interface'

export class GetFeatureRouterApiFactory {
  static create(): GetFeatureRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetFeatureRouterApiService(executeRequest)
  }
}
