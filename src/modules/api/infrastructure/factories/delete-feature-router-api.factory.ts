import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { DeleteFeatureRouterApiService } from '../services/delete-feature-router-api.service'
import type { DeleteFeatureRouterApiServiceInterface } from '../../domain/interfaces/delete-feature-router-api-service.interface'

export class DeleteFeatureRouterApiFactory {
  static create(): DeleteFeatureRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteFeatureRouterApiService(executeRequest)
  }
}
