import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostFeatureRouterApiService } from '../services/post-feature-router-api.service'
import type { PostFeatureRouterApiServiceInterface } from '../../domain/interfaces/post-feature-router-api-service.interface'

export class PostFeatureRouterApiFactory {
  static create(): PostFeatureRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostFeatureRouterApiService(executeRequest)
  }
}
