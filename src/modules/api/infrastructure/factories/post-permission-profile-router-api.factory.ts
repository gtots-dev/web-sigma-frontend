import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostPermissionProfileRouterApiService } from '../services/post-permission-profile-router-api.service'
import type { PostPermissionProfileRouterApiServiceInterface } from '../../domain/interfaces/post-permission-profile-router-api-service.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPermissionProfileRouterApiFactory {
  static create(
    params: UrlParams
  ): PostPermissionProfileRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostPermissionProfileRouterApiService(executeRequest, params)
  }
}
