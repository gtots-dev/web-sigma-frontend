import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { DeleteSelectionOperationService } from '../services/delete-operation.service'
import type { DeleteSelectionOperationServiceInterface } from '../../domain/interfaces/delete-selection-operation-service.interface'

export class DeleteSelectionOperationFactory {
  static create(): DeleteSelectionOperationServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteSelectionOperationService(executeRequest)
  }
}
