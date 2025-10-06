import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetPermissionProfileFeatureRouterApiService } from '../services/get-permission-profile-feature-router-api.service'
import type { GetPermissionProfileFeatureRouterApiServiceInterface } from '../../domain/interfaces/get-permission-profile-feature-router-api-service.interface'

export class GetPermissionProfileFeatureRouterApiFactory {
  static create(): GetPermissionProfileFeatureRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetPermissionProfileFeatureRouterApiService(executeRequest)
  }
}
