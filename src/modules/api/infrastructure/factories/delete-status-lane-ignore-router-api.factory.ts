import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteStatusLaneIgnoreRouterApiGateway } from '../../domain/gateways/delete-status-lane-ignore-router-api.gateway'
import { DeleteStatusLaneIgnoreRouterApiService } from '../services/delete-status-lane-ignore-router-api.service'

export class DeleteStatusLaneIgnoreRouterApiFactory {
  static create(params: UrlParams): DeleteStatusLaneIgnoreRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteStatusLaneIgnoreRouterApiService(executeRequest, params)
  }
}
