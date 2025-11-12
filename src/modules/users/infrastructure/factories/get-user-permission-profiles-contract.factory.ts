import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserPermissionProfileContractService } from '../services/get-user-permission-profiles-contract.service'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetUserPermissionProfileContractGateway } from '../../domain/gateways/get-user-permission-profiles-contract.gateway'

export class GetUserPermissionProfileContractFactory {
  static create(params: UrlParams): GetUserPermissionProfileContractGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetUserPermissionProfileContractService(
      executeRequest,
      authToken,
      params
    )
  }
}
