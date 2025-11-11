import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { GetOperationsRouterApiGateway } from '../../domain/gateways/get-operations-router-api.gateway'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetOperationsRouterApiService } from '../services/get-operations-router-api.service'

export class GetOperationRouterApiFactory {
  static create(): GetOperationsRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetOperationsRouterApiService(executeRequest)
  }
}
