import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUsersRouterApiService } from '../services/get-users-router-api.service'
import type { GetUsersRouterApiGateway } from '../../domain/gateways/get-users-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUsersRouterApiFactory {
  static create(params: UrlParams): GetUsersRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUsersRouterApiService(executeRequest, params)
  }
}
