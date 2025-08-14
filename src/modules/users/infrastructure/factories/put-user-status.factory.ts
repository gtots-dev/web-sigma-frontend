import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutUserStatusServiceInterface } from '../../domain/interfaces/put-user-status-service.interface'
import { PutUserStatusService } from '../services/put-user-status.service'

export class PutUserStatusFactory {
  static create(): PutUserStatusServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutUserStatusService(executeRequest)
  }
}
