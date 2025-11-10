import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { PostLaneGateway } from '../../domain/gateways/post-lane.gateway'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostLaneService } from '../services/post-lane.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class PostLaneFactory {
  static create(params: UrlParams): PostLaneGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostLaneService(executeRequest, authToken, params)
  }
}
