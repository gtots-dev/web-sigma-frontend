import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetProcessingUnitStatusListRouterApiService } from '../services/get-processing-unit-status-list-router-api.service'

export class GetProcessingUnitStatusListRouterApiFactory {
  static create(params: UrlParams): GetProcessingUnitStatusListRouterApiService {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetProcessingUnitStatusListRouterApiService(executeRequest, params)
  }
}
