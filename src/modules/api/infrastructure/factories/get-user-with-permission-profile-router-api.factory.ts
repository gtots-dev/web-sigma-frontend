import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetUserWithPermissionProfileRouterApiGateway } from '../../domain/gateways/get-user-with-permission-profile-router-api.gateway'
import { GetUserWithPermissionProfileRouterApiService } from '../services/get-user-with-permission-profile-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserWithPermissionProfileRouterApiFactory {
  static create(
    params: UrlParams
  ): GetUserWithPermissionProfileRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserWithPermissionProfileRouterApiService(
      executeRequest,
      params
    )
  }
}
