import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutContractStatusRouterApiGateway } from '../../domain/gateways/put-contract-status-router-api.gateway'
import { PutContractStatusRouterApiService } from '../services/put-contract-status-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PutContractStatusRouterApiFactory {
  static create(params: UrlParams): PutContractStatusRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutContractStatusRouterApiService(executeRequest, params)
  }
}
