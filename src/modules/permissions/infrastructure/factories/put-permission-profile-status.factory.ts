import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutPermissionProfileStatusServiceInterface } from '../../domain/interfaces/put-permission-profile-status-service.interface'
import { PutPermissionProfileStatusService } from '../services/put-permission-profile-status.service'

export class PutPermissionProfileStatusFactory {
  static create(): PutPermissionProfileStatusServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutPermissionProfileStatusService(executeRequest)
  }
}
