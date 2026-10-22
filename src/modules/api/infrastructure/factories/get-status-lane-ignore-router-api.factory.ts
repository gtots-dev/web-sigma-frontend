import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetStatusLaneIgnoreRouterApiGateway } from '../../domain/gateways/get-status-lane-ignore-router-api.gateway'
import { GetStatusLaneIgnoreRouterApiService } from '../services/get-status-lane-ignore-router-api.service'

export class GetStatusLaneIgnoreRouterApiFactory {
  static create(params: UrlParams): GetStatusLaneIgnoreRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetStatusLaneIgnoreRouterApiService(executeRequest, params)
  }
}
