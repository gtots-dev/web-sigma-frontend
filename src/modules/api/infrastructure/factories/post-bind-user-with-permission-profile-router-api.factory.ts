import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostBindUserWithPermissionProfileRouterApiGateway } from '../../domain/gateways/post-bind-user-with-permission-profile-router-api.gateway'
import { PostBindUserWithPermissionProfileRouterApiService } from '../services/post-bind-user-with-permission-profile-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostBindUserWithPermissionProfileRouterApiFactory {
  static create(
    params: UrlParams
  ): PostBindUserWithPermissionProfileRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostBindUserWithPermissionProfileRouterApiService(
      executeRequest,
      params
    )
  }
}
