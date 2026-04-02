import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { PostTrafficFlowRouterApiGateway } from '../../domain/gateways/post-traffic-flow-router-api.gateway'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostTrafficFlowRouterApiService } from '../services/post-traffic-flow-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostTrafficFlowRouterApiFactory {
  static create(params: UrlParams): PostTrafficFlowRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostTrafficFlowRouterApiService(executeRequest, params)
  }
}
