import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutContractStatusRouterApiServiceInterface } from '../../domain/interfaces/put-contract-status-router-api-service.interface'
import { PutContractStatusRouterApiService } from '../services/put-contract-status-router-api.service'

export class PutContractStatusRouterApiFactory {
  static create(): PutContractStatusRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutContractStatusRouterApiService(executeRequest)
  }
}
