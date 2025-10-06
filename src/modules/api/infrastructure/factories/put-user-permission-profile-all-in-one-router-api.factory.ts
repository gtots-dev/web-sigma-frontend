import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutUserPermissionProfileAllInOneRouterApiServiceInterface } from '../../domain/interfaces/put-user-permission-profiles-all-in-one-router-api-service.interface'
import { PutUserPermissionProfileAllInOneRouterApiService } from '../services/put-user-permission-profile-all-in-one-router-api.service'

export class PutUserPermissionProfileAllInOneRouterApiFactory {
  static create(): PutUserPermissionProfileAllInOneRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutUserPermissionProfileAllInOneRouterApiService(executeRequest)
  }
}
