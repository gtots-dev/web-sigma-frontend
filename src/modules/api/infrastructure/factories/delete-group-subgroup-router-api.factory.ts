import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteGroupSubgroupRouterApiGateway } from '../../domain/gateways/delete-group-subgroup-router-api.gateway'
import { DeleteGroupSubgroupRouterApiService } from '../services/delete-group-subgroup-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteGroupSubgroupRouterApiFactory {
  static create(params: UrlParams): DeleteGroupSubgroupRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteGroupSubgroupRouterApiService(executeRequest, params)
  }
}
