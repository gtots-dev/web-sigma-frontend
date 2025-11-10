import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostUserPasswordResetRouterApiService } from '../services/post-user-password-reset-router-api.service'
import type { PostUserPasswordResetRouterApiGateway } from '../../domain/gateways/post-user-password-reset-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostUserPasswordResetRouterApiFactory {
  static create(
    params: UrlParams
  ): PostUserPasswordResetRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostUserPasswordResetRouterApiService(executeRequest, params)
  }
}
