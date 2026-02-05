import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PatchUserRouterApiService } from '../services/patch-user-router-api.service'
import type { PatchUserRouterApiGateway } from '../../domain/gateways/patch-user-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchUserRouterApiFactory {
  static create(params: UrlParams): PatchUserRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchUserRouterApiService(
      executeRequest,
      params
    )
  }
}
