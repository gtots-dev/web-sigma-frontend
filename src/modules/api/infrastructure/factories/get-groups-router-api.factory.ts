import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetGroupsRouterApiGateway } from '../../domain/gateways/get-groups-router-api.gateway'
import { GetGroupsRouterApiService } from '../services/get-groups-router-api.service'

export class GetGroupsRouterApiFactory {
  static create(params: UrlParams): GetGroupsRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetGroupsRouterApiService(executeRequest, params)
  }
}
