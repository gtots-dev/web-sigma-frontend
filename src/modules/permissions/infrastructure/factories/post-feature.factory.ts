import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostFeatureServiceInterface } from '../../domain/interfaces/post-feature-service.interface'
import { PostFeatureService } from '../services/post-feature.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class PostFeatureFactory {
  static create(params: UrlParams): PostFeatureServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostFeatureService(executeRequest, authToken, params)
  }
}
