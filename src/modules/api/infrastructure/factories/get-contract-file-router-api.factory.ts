import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetContractFileRouterApiService } from '../services/get-contract-file-router-api.service'
import type { GetContractFileRouterApiGateway } from '../../domain/gateways/get-contract-file-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractFileRouterApiFactory {
  static create(params: UrlParams): GetContractFileRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetContractFileRouterApiService(executeRequest, params)
  }
}
