import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetProcessingUnitRouterApiServiceInterface } from '../../domain/interfaces/get-processing-unit-router-api-service.interface'
import { GetProcessingUnitRouterApiService } from '../services/get-processing-unit-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetProcessingUnitRouterApiFactory {
  static create(params: UrlParams): GetProcessingUnitRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetProcessingUnitRouterApiService(executeRequest, params)
  }
}
