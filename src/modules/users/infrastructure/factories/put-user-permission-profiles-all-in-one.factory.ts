import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PutUserPermissionProfileAllInOneService } from '../services/put-user-permission-profiles-all-in-one.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class PutUserPermissionProfileAllInOneFactory {
  static create(params: UrlParams) {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PutUserPermissionProfileAllInOneService(
      executeRequest,
      authToken,
      params
    )
  }
}
