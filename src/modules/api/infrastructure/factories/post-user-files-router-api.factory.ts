import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostUserFilesRouterApiGateway } from '../../domain/gateways/post-user-files-router-api.gateway'
import { PostUserFilesRouterApiService } from '../services/post-user-files-router-api.service'

export class PostUserFilesRouterApiFactory {
  static create(params: UrlParams): PostUserFilesRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostUserFilesRouterApiService(executeRequest, params)
  }
}
