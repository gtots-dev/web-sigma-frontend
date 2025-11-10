import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetContractsRouterApiService } from '../services/get-contracts-router-api.service'
import type { GetContractsRouterApiGateway } from '../../domain/gateways/get-contracts-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractsRouterApiFactory {
  static create(params: UrlParams): GetContractsRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetContractsRouterApiService(executeRequest, params)
  }
}
