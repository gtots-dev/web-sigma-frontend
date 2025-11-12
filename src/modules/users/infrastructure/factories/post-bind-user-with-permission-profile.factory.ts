import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostBindUserWithPermissionProfileService } from '../services/post-bind-user-with-permission-profile.service'
import type { PostBindUserWithPermissionProfileGateway } from '../../domain/gateways/post-bind-user-with-permission-profile.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class PostBindUserWithPermissionProfileFactory {
  static create(params: UrlParams): PostBindUserWithPermissionProfileGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostBindUserWithPermissionProfileService(
      executeRequest,
      authToken,
      params
    )
  }
}
