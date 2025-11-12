import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteBindUserWithPermissionProfileGateway } from '../../domain/gateways/delete-bind-user-with-permission-profile.gateway'
import { DeleteBindUserWithPermissionProfileService } from '../services/delete-bind-user-with-permission-profile.service'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteBindUserWithPermissionProfileFactory {
  static create(params: UrlParams): DeleteBindUserWithPermissionProfileGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new DeleteBindUserWithPermissionProfileService(
      executeRequest,
      authToken,
      params
    )
  }
}
