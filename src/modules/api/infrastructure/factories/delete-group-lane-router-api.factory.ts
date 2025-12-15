import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteGroupLaneRouterApiGateway } from '../../domain/gateways/delete-group-lane-router-api.gateway'
import { DeleteGroupLaneRouterApiService } from '../services/delete-group-lane-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteGroupLaneRouterApiFactory {
  static create(params: UrlParams): DeleteGroupLaneRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteGroupLaneRouterApiService(executeRequest, params)
  }
}
