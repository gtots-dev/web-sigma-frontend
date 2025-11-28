import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeletePointLaneRouterApiGateway } from '../../domain/gateways/delete-point-lane-router-api.gateway'
import { DeletePointLaneRouterApiService } from '../services/delete-point-lane-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeletePointLaneRouterApiFactory {
  static create(params: UrlParams): DeletePointLaneRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeletePointLaneRouterApiService(executeRequest, params)
  }
}
