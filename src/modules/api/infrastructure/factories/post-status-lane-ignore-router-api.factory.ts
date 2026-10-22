import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostStatusLaneIgnoreRouterApiGateway } from '../../domain/gateways/post-status-lane-ignore-router-api.gateway'
import { PostStatusLaneIgnoreRouterApiService } from '../services/post-status-lane-ignore-router-api.service'

export class PostStatusLaneIgnoreRouterApiFactory {
  static create(params: UrlParams): PostStatusLaneIgnoreRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostStatusLaneIgnoreRouterApiService(executeRequest, params)
  }
}
