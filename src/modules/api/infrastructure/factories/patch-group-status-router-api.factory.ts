import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchGroupStatusRouterApiGateway } from '../../domain/gateways/patch-group-status-router-api.gateway'
import { PatchGroupStatusRouterApiService } from '../services/patch-group-status-router-api.service'

export class PatchGroupStatusRouterApiFactory {
  static create(params: UrlParams): PatchGroupStatusRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchGroupStatusRouterApiService(executeRequest, params)
  }
}
