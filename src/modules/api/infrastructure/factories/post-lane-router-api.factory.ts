import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostLaneRouterApiServiceInterface } from '../../domain/interfaces/post-lane-router-api-service.interface'
import { PostLaneRouterApiService } from '../services/post-lane-router-api.service'

export class PostLaneRouterApiFactory {
  static create(): PostLaneRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostLaneRouterApiService(executeRequest)
  }
}
