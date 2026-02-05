import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostUserFilesGateway } from '../../domain/gateways/post-user-files.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import { PostUserFilesService } from '../services/post-user-files.service'

export class PostUserFilesFactory {
  static create(params: UrlParams): PostUserFilesGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostUserFilesService(executeRequest, authToken, params)
  }
}
