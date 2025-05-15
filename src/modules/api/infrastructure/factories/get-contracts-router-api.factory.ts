import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetContractsRouterApiService } from '../services/get-contracts-router-api.service'
import type { GetContractsRouterApiServiceInterface } from '../../domain/interfaces/get-contracts-router-api-service.interface'

export class GetContractsRouterApiFactory {
  static create(): GetContractsRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetContractsRouterApiService(executeRequest)
  }
}
