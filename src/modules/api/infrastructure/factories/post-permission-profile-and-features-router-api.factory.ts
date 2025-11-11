import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostPermissionProfileAndFeaturesRouterApiGateway } from '../../domain/gateways/post-permission-profile-and-features-router-api.gateway'
import { PostPermissionProfileAndFeaturesRouterApiService } from '../services/post-permission-profile-and-features-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPermissionProfileAndFeaturesRouterApiFactory {
  static create(
    params: UrlParams
  ): PostPermissionProfileAndFeaturesRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostPermissionProfileAndFeaturesRouterApiService(
      executeRequest,
      params
    )
  }
}
