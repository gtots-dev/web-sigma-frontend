import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostGroupRouterApiGateway } from '../../domain/gateways/post-group-router-api.gateway'
import { PostGroupRouterApiService } from '../services/post-group-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostGroupRouterApiFactory {
  static create(params: UrlParams): PostGroupRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostGroupRouterApiService(executeRequest, params)
  }
}
