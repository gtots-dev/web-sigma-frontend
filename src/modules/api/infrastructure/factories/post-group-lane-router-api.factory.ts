import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostGroupLaneRouterApiGateway } from '../../domain/gateways/post-group-lane-router-api.gateway'
import { PostGroupLaneRouterApiService } from '../services/post-group-lane-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostGroupLaneRouterApiFactory {
  static create(params: UrlParams): PostGroupLaneRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostGroupLaneRouterApiService(executeRequest, params)
  }
}
