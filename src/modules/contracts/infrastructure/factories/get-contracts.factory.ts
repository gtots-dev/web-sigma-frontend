import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetContractsService } from '../services/get-contracts.service'
import type { GetContractsServiceInterface } from '../../domain/interfaces/get-contracts-service.interface'

export class GetContractsFactory {
  static create(): GetContractsServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetContractsService(executeRequest)
  }
}
