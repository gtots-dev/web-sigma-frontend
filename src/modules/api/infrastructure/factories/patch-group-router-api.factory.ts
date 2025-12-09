import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchGroupRouterApiGateway } from '../../domain/gateways/patch-group-router-api.gateway'
import { PatchGroupRouterApiService } from '../services/patch-group-router-api.service'

export class PatchGroupRouterApiFactory {
  static create(params: UrlParams): PatchGroupRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchGroupRouterApiService(executeRequest, params)
  }
}
