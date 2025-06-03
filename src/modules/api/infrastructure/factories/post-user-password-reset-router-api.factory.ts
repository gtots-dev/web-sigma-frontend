import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostUserPasswordResetRouterApiService } from '../services/post-user-password-reset-router-api.service'
import type { PostUserPasswordResetRouterApiServiceInterface } from '../../domain/interfaces/post-user-password-reset-router-api-service.interface'

export class PostUserPasswordResetRouterApiFactory {
  static create(): PostUserPasswordResetRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostUserPasswordResetRouterApiService(executeRequest)
  }
}
