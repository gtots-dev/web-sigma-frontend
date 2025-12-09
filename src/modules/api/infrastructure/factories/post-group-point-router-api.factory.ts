import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostGroupPointRouterApiGateway } from '../../domain/gateways/post-group-point-router-api.gateway'
import { PostGroupPointRouterApiService } from '../services/post-group-point-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostGroupPointRouterApiFactory {
  static create(params: UrlParams): PostGroupPointRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostGroupPointRouterApiService(executeRequest, params)
  }
}
