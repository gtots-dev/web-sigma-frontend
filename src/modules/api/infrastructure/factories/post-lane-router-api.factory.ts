import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostLaneRouterApiGateway } from '../../domain/gateways/post-lane-router-api.gateway'
import { PostLaneRouterApiService } from '../services/post-lane-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostLaneRouterApiFactory {
  static create(params: UrlParams): PostLaneRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostLaneRouterApiService(executeRequest, params)
  }
}
