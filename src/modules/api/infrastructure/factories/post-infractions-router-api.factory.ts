import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostInfractionsRouterApiGateway } from '../../domain/gateways/post-infractions-router-api.gateway'
import { PostInfractionsRouterApiService } from '../services/post-infractions-router-api.service'

export class PostInfractionsRouterApiFactory {
  static create(params: UrlParams): PostInfractionsRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostInfractionsRouterApiService(executeRequest, params)
  }
}
