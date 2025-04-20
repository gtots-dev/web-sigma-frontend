import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { DeleteSelectionOperationService } from '../services/delete-operation.service'

export class DeleteSelectionOperationFactory {
  static create(): DeleteSelectionOperationService {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteSelectionOperationService(executeRequest)
  }
}
