import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { GetOperationsRouterApiServiceInterface } from '../../domain/interfaces/get-operations-router-api-service.interface'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetOperationsRouterApiService } from '../services/get-operations-router-api.service'

export class GetOperationRouterApiFactory {
  static create(): GetOperationsRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetOperationsRouterApiService(executeRequest)
  }
}
