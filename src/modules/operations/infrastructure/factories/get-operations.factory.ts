import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetOperationsService } from '../services/get-operations.service'
import type { GetOperationsGateway } from '../../domain/gateways/get-operations.gateway'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class GetOperationsFactory {
  static create(): GetOperationsGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetOperationsService(executeRequest, authToken)
  }
}
