import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostUserService } from '../services/post-user.service'
import type { PostUserGateway } from '../../domain/interfaces/post-user.gateway'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostUserFactory {
  static create(params: UrlParams): PostUserGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostUserService(executeRequest, authToken, params)
  }
}
