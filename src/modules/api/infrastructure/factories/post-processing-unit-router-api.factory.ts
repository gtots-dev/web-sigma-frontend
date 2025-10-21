import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostProcessingUnitRouterApiServiceInterface } from '../../domain/interfaces/post-processing-unit-router-api-service.interface'
import { PostProcessingUnitRouterApiService } from '../services/post-processing-unit-router-api.service'

export class PostProcessingUnitRouterApiFactory {
  static create(): PostProcessingUnitRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostProcessingUnitRouterApiService(executeRequest)
  }
}
