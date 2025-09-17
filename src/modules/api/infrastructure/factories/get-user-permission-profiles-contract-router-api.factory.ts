import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserPermissionProfileContractRouterApiService } from '../services/get-user-permission-profiles-contracts-router-api.service'

export class GetUserPermissionProfileContractRouterApiFactory {
  static create(): GetUserPermissionProfileContractRouterApiService {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserPermissionProfileContractRouterApiService(executeRequest)
  }
}
