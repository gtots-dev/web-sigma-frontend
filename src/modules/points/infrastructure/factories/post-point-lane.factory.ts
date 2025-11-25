import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { PostPointLaneGateway } from '../../domain/gateways/post-point-lane.gateway'
import { PostPointLaneService } from '../services/post-point-lane.service'

export class PostPointLaneFactory {
  static create(params: UrlParams): PostPointLaneGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostPointLaneService(executeRequest, authToken, params)
  }
}
