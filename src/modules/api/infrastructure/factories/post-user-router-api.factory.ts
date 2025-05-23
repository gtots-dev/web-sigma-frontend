import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostUserRouterApiService } from '../services/post-user-router-api.service'
import type { PostUserRouterApiServiceInterface } from '../../domain/interfaces/post-user-router-api-service.interface'

export class PostUserRouterApiFactory {
  static create(): PostUserRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostUserRouterApiService(executeRequest)
  }
}
