import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetPointsRouterApiGateway } from '../../domain/gateways/get-points-router-api.gateway'
import { GetPointsRouterApiService } from '../services/get-points-router-api.service'

export class GetPointsRouterApiFactory {
  static create(params: UrlParams): GetPointsRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetPointsRouterApiService(executeRequest, params)
  }
}
