import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutUserPermissionProfileAllInOneRouterApiGateway } from '../../domain/gateways/put-user-permission-profiles-all-in-one-router-api.gateway'
import { PutUserPermissionProfileAllInOneRouterApiService } from '../services/put-user-permission-profile-all-in-one-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PutUserPermissionProfileAllInOneRouterApiFactory {
  static create(
    params: UrlParams
  ): PutUserPermissionProfileAllInOneRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutUserPermissionProfileAllInOneRouterApiService(
      executeRequest,
      params
    )
  }
}
