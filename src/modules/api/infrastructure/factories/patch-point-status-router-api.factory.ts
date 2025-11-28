import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchPointStatusRouterApiGateway } from '../../domain/gateways/patch-point-status-router-api.gateway'
import { PatchPointStatusRouterApiService } from '../services/patch-point-status-router-api.service'

export class PatchPointStatusRouterApiFactory {
  static create(params: UrlParams): PatchPointStatusRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchPointStatusRouterApiService(executeRequest, params)
  }
}
