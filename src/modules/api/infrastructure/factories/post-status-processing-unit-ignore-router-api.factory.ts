import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostStatusProcessingUnitIgnoreRouterApiGateway } from '../../domain/gateways/post-status-processing-unit-ignore-router-api.gateway'
import { PostStatusProcessingUnitIgnoreRouterApiService } from '../services/post-status-processing-unit-ignore-router-api.service'

export class PostStatusProcessingUnitIgnoreRouterApiFactory {
  static create(
    params: UrlParams
  ): PostStatusProcessingUnitIgnoreRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostStatusProcessingUnitIgnoreRouterApiService(
      executeRequest,
      params
    )
  }
}
