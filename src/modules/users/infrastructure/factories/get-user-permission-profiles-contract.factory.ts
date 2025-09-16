import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserPermissionProfileContractService } from '../services/get-user-permission-profiles-contract.service'

export class GetUserPermissionProfileContractFactory {
  static create() {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserPermissionProfileContractService(executeRequest)
  }
}
