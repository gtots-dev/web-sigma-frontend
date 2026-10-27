import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetStatusProcessingUnitIgnoreRouterApiGateway } from '../../domain/gateways/get-status-processing-unit-ignore-router-api.gateway'
import { GetStatusProcessingUnitIgnoreRouterApiService } from '../services/get-status-processing-unit-ignore-router-api.service'

export class GetStatusProcessingUnitIgnoreRouterApiFactory {
  static create(
    params: UrlParams
  ): GetStatusProcessingUnitIgnoreRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetStatusProcessingUnitIgnoreRouterApiService(
      executeRequest,
      params
    )
  }
}
