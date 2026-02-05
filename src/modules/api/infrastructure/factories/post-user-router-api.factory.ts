import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostUserRouterApiService } from '../services/post-user-router-api.service'
import type { PostUserRouterApiGateway } from '../../domain/gateways/post-user-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostUserRouterApiFactory {
  static create(params: UrlParams): PostUserRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostUserRouterApiService(executeRequest, params)
  }
}
