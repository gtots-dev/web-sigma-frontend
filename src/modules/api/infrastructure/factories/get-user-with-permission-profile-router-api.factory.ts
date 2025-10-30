import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetUserWithPermissionProfileRouterApiServiceInterface } from '../../domain/interfaces/get-user-with-permission-profile-router-api-service.interface'
import { GetUserWithPermissionProfileRouterApiService } from '../services/get-user-with-permission-profile-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserWithPermissionProfileRouterApiFactory {
  static create(
    params: UrlParams
  ): GetUserWithPermissionProfileRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserWithPermissionProfileRouterApiService(
      executeRequest,
      params
    )
  }
}
