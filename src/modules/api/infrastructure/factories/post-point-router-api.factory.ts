import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostPointRouterApiGateway } from '../../domain/gateways/post-point-router-api.gateway'
import { PostPointRouterApiService } from '../services/post-point-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPointRouterApiFactory {
  static create(params: UrlParams): PostPointRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostPointRouterApiService(executeRequest, params)
  }
}
