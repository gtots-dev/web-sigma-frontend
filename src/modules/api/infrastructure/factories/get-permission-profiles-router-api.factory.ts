import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetPermissionProfilesRouterApiServiceInterface } from '../../domain/interfaces/get-permission-profile-router-api-service.interface'
import { GetPermissionProfilesRouterApiService } from '../services/get-permission-profiles-router-api.service'

export class GetPermissionProfilesRouterApiFactory {
  static create(): GetPermissionProfilesRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetPermissionProfilesRouterApiService(executeRequest)
  }
}
