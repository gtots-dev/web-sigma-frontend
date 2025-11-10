import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserWithPermissionProfileService } from '../services/get-user-with-permission-profile.service'
import type { GetUserWithPermissionProfileGateway } from '../../domain/gateways/get-user-with-permission-profile.gateway'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserWithPermissionProfileFactory {
  static create(params: UrlParams): GetUserWithPermissionProfileGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetUserWithPermissionProfileService(
      executeRequest,
      authToken,
      params
    )
  }
}
