import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostBindUserWithPermissionProfileRouterApiServiceInterface } from '../../domain/interfaces/post-bind-user-with-permission-profile-router-api-service.interface'
import { PostBindUserWithPermissionProfileRouterApiService } from '../services/post-bind-user-with-permission-profile-router-api.service'

export class PostBindUserWithPermissionProfileRouterApiFactory {
  static create(): PostBindUserWithPermissionProfileRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostBindUserWithPermissionProfileRouterApiService(executeRequest)
  }
}
