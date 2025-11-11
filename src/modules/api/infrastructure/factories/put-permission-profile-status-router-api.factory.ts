import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PatchPermissionProfileStatusRouterApiGateway } from '../../domain/gateways/put-permission-profile-status-router-api.gateway'
import { PatchPermissionProfileStatusRouterApiService } from '../services/patch-permission-profile-status-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchPermissionProfileStatusRouterApiFactory {
  static create(
    params: UrlParams
  ): PatchPermissionProfileStatusRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchPermissionProfileStatusRouterApiService(
      executeRequest,
      params
    )
  }
}
