import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchLaneStatusRouterApiGateway } from '../../domain/gateways/patch-lane-status-router-api.gateway'
import { PatchLaneStatusRouterApiService } from '../services/patch-lane-status-router-api.service'

export class PatchLaneStatusRouterApiFactory {
  static create(params: UrlParams): PatchLaneStatusRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchLaneStatusRouterApiService(executeRequest, params)
  }
}
