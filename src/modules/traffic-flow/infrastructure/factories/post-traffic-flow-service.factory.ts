import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { PostTrafficFlowServiceGateway } from '../../domain/gateways/post-traffic-flow-service.gateway'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import { PostTrafficFlowService } from '../services/post-traffic-flow.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostTrafficFlowFactory {
  static create(params: UrlParams): PostTrafficFlowServiceGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostTrafficFlowService(executeRequest, authToken, params)
  }
}
