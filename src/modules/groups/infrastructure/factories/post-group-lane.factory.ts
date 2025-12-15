import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { PostGroupLaneGateway } from '../../domain/gateways/post-group-lane.gateway'
import { PostGroupLaneService } from '../services/post-group-lane.service'

export class PostGroupLaneFactory {
  static create(params: UrlParams): PostGroupLaneGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostGroupLaneService(executeRequest, authToken, params)
  }
}
