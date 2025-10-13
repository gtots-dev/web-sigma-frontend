import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutContractStatusServiceInterface } from '../../domain/interfaces/put-contract-status-service.interface'
import { PutContractStatusService } from '../services/put-contract-status.service'

export class PutContractStatusFactory {
  static create(): PutContractStatusServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutContractStatusService(executeRequest)
  }
}
