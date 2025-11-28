import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostPointLaneRouterApiGateway } from '../../domain/gateways/post-point-lane-router-api.gateway'
import { PostPointLaneRouterApiService } from '../services/post-point-lane-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPointLaneRouterApiFactory {
  static create(params: UrlParams): PostPointLaneRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostPointLaneRouterApiService(executeRequest, params)
  }
}
