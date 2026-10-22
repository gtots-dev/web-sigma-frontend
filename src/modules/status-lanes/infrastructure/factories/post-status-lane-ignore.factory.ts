import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostStatusLaneIgnoreGateway } from '../../domain/gateways/post-status-lane-ignore.gateway'
import { PostStatusLaneIgnoreService } from '../services/post-status-lane-ignore.service'

export class PostStatusLaneIgnoreFactory {
  static create(params: UrlParams): PostStatusLaneIgnoreGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostStatusLaneIgnoreService(executeRequest, params)
  }
}
