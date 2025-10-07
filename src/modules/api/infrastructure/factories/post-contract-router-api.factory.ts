import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostContractRouterApiService } from '../services/post-contract-router-api.service'
import type { PostContractRouterApiServiceInterface } from '../../domain/interfaces/post-contract-router-api-service.interface'

export class PostContractRouterApiFactory {
  static create(): PostContractRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostContractRouterApiService(executeRequest)
  }
}
