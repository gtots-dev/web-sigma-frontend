import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchPointRouterApiGateway } from '../../domain/gateways/patch-point-router-api.gateway'
import { PatchPointRouterApiService } from '../services/patch-point-router-api.service'

export class PatchPointRouterApiFactory {
  static create(params: UrlParams): PatchPointRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchPointRouterApiService(executeRequest, params)
  }
}
