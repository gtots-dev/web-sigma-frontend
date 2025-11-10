import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostFeatureRouterApiService } from '../services/post-feature-router-api.service'
import type { PostFeatureRouterApiGateway } from '../../domain/gateways/post-feature-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostFeatureRouterApiFactory {
  static create(params: UrlParams): PostFeatureRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostFeatureRouterApiService(executeRequest, params)
  }
}
