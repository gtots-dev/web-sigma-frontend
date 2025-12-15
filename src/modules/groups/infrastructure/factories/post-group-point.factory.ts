import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import { PostGroupPointService } from '../services/post-group-point.service'
import type { PostGroupPointGateway } from '../../domain/gateways/post-group-point.gateway'

export class PostGroupPointFactory {
  static create(params: UrlParams): PostGroupPointGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostGroupPointService(executeRequest, authToken, params)
  }
}
