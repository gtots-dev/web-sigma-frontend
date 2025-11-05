import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PatchPermissionProfileStatusRouterApiServiceInterface } from '../../domain/interfaces/put-permission-profile-status-router-api-service.interface'
import { PatchPermissionProfileStatusRouterApiService } from '../services/patch-permission-profile-status-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchPermissionProfileStatusRouterApiFactory {
  static create(
    params: UrlParams
  ): PatchPermissionProfileStatusRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchPermissionProfileStatusRouterApiService(
      executeRequest,
      params
    )
  }
}
