import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { PostTrafficFlowServiceGateway } from '../../domain/gateways/post-traffic-flow-service.gateway'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostTrafficFlowService } from '../services/post-traffic-flow.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostTrafficFlowFactory {
  static create(params: UrlParams): PostTrafficFlowServiceGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostTrafficFlowService(executeRequest, params)
  }
}
