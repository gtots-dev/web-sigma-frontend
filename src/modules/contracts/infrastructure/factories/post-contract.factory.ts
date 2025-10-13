import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostContractService } from '../services/post-contract.service'
import type { PostContractServiceInterface } from '../../domain/interfaces/post-contract-service.interface'
export class PostContractFactory {
  static create(): PostContractServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostContractService(executeRequest)
  }
}
