import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { SetSelectionOperationService } from '../services/set-operation.service'

export class SetSelectionOperationFactory {
  static create() {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new SetSelectionOperationService(executeRequest)
  }
}
