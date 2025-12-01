import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PatchUserStatusRouterApiGateway } from '../../domain/gateways/patch-user-status-router-api.gateway'
import { PatchUserStatusRouterApiService } from '../services/patch-user-status-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchUserStatusRouterApiFactory {
  static create(params: UrlParams): PatchUserStatusRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchUserStatusRouterApiService(executeRequest, params)
  }
}
