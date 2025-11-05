import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostPermissionProfileAndFeaturesRouterApiServiceInterface } from '../../domain/interfaces/post-permission-profile-and-features-router-api-service.interface'
import { PostPermissionProfileAndFeaturesRouterApiService } from '../services/post-permission-profile-and-features-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPermissionProfileAndFeaturesRouterApiFactory {
  static create(
    params: UrlParams
  ): PostPermissionProfileAndFeaturesRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostPermissionProfileAndFeaturesRouterApiService(
      executeRequest,
      params
    )
  }
}
