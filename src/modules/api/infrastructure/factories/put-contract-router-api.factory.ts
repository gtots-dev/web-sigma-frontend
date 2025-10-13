import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PutContractRouterApiService } from '../services/put-contract-router-api.service'
import type { PutContractRouterApiServiceInterface } from '../../domain/interfaces/put-contract-router-api-service.interface'

export class PutContractRouterApiFactory {
  static create(): PutContractRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutContractRouterApiService(executeRequest)
  }
}
