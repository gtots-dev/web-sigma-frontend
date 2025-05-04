import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetOperationsService } from '../services/get-operations.service'
import type { GetOperationsServiceInterface } from '../../domain/interfaces/get-operations-service.interface'

export class GetOperationsFactory {
  static create(): GetOperationsServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetOperationsService(executeRequest)
  }
}
