import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostGroupSubgroupRouterApiGateway } from '../../domain/gateways/post-group-subgroup-router-api.gateway'
import { PostGroupSubgroupRouterApiService } from '../services/post-group-subgroup-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostGroupSubgroupRouterApiFactory {
  static create(params: UrlParams): PostGroupSubgroupRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostGroupSubgroupRouterApiService(executeRequest, params)
  }
}
