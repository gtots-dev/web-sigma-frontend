import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostPermissionProfileAndFeaturesRouterApiServiceInterface } from '../../domain/interfaces/post-permission-profile-and-features-router-api-service.interface'
import { PostPermissionProfileAndFeaturesRouterApiService } from '../services/post-permission-profile-and-features-router-api.service'

export class PostPermissionProfileAndFeaturesRouterApiFactory {
  static create(): PostPermissionProfileAndFeaturesRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostPermissionProfileAndFeaturesRouterApiService(executeRequest)
  }
}
