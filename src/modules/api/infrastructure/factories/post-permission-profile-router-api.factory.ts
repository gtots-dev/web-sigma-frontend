import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostPermissionProfileRouterApiService } from '../services/post-permission-profile-router-api.service'
import type { PostPermissionProfileRouterApiServiceInterface } from '../../domain/interfaces/post-permission-profile-router-api-service.interface'

export class PostPermissionProfileRouterApiFactory {
  static create(): PostPermissionProfileRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostPermissionProfileRouterApiService(executeRequest)
  }
}
