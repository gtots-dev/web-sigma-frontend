import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchLaneStatusRouterApiServiceInterface } from '../../domain/interfaces/patch-lane-status-router-api-service.interface'
import { PatchLaneStatusRouterApiService } from '../services/patch-lane-status-router-api.service'

export class PatchLaneStatusRouterApiFactory {
  static create(params: UrlParams): PatchLaneStatusRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchLaneStatusRouterApiService(executeRequest, params)
  }
}
