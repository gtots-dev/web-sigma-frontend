import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostPermissionProfileAndFeaturesService } from '../services/post-permission-profile-and-features.service'
import type { PostPermissionProfileAndFeaturesGateway } from '../../domain/interfaces/post-permission-profile-and-features.gateway'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPermissionProfileAndFeaturesFactory {
  static create(
    params: UrlParams
  ): PostPermissionProfileAndFeaturesGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostPermissionProfileAndFeaturesService(
      executeRequest,
      authToken,
      params
    )
  }
}
