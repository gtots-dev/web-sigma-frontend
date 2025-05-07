import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostUserRouterApiService } from '../services/post-user-router-api.service'

export class PostUserRouterApiFactory {
  static create() {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostUserRouterApiService(executeRequest)
  }
}
