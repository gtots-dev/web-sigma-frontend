import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PutUserService } from '../services/put-user.service'
import type { PutUserServiceInterface } from '../../domain/interfaces/put-user-service.interface'

export class PutUserFactory {
  static create(): PutUserServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutUserService(executeRequest)
  }
}
