import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetPermissionProfilesServiceInterface } from '../../domain/interfaces/get-permission-profiles-service.interface'
import { GetPermissionProfilesService } from '../services/get-permission-profiles.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class GetPermissionProfilesFactory {
  static create(params: UrlParams): GetPermissionProfilesServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetPermissionProfilesService(executeRequest, authToken, params)
  }
}
