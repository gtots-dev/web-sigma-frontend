import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchLaneRouterApiGateway } from '../../domain/gateways/patch-lane-router-api.gateway'
import { PatchLaneRouterApiService } from '../services/patch-lane-router-api.service'

export class PatchLaneRouterApiFactory {
  static create(params: UrlParams): PatchLaneRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchLaneRouterApiService(executeRequest, params)
  }
}
