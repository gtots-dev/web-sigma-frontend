import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetProcessingUnitRouterApiGateway } from '../../domain/gateways/get-processing-unit-router-api.gateway'
import { GetProcessingUnitRouterApiService } from '../services/get-processing-unit-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetProcessingUnitRouterApiFactory {
  static create(params: UrlParams): GetProcessingUnitRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetProcessingUnitRouterApiService(executeRequest, params)
  }
}
