import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetSelectionOperationService } from '../services/get-operation.service'
import type { GetSelectionOperationServiceInterface } from '../../domain/interfaces/get-selection-operation-service.interface'

export class GetSelectionOperationFactory {
  static create(): GetSelectionOperationServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetSelectionOperationService(executeRequest)
  }
}
