import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetContractLanesRouterApiGateway } from '../../domain/gateways/get-contract-lanes-router-api.gateway'
import { GetContractLanesRouterApiService } from '../services/get-contract-lanes-router-api.service'

export class GetContractLanesRouterApiFactory {
  static create(params: UrlParams): GetContractLanesRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetContractLanesRouterApiService(executeRequest, params)
  }
}
