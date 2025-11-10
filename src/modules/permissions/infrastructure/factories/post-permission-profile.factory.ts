import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostPermissionProfileGateway } from '../../domain/interfaces/post-permission-profile.gateway'
import { PostPermissionProfileService } from '../services/post-permission-profile.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class PostPermissionProfileFactory {
  static create(params: UrlParams): PostPermissionProfileGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostPermissionProfileService(executeRequest, authToken, params)
  }
}
