import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetLanesStatusListRouterApiService } from '../services/get-lanes-status-list-router-api.service'

export class GetLanesStatusListRouterApiFactory {
  static create(params: UrlParams): GetLanesStatusListRouterApiService {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetLanesStatusListRouterApiService(executeRequest, params)
  }
}
