import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutContractServiceInterface } from '../../domain/interfaces/put-contract-service.interface'
import { PutContractService } from '../services/put-contract.service'

export class PutContractFactory {
  static create(): PutContractServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutContractService(executeRequest)
  }
}
