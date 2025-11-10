import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteFeatureGateway } from '../../domain/interfaces/delete-feature.gateway'
import { DeleteFeatureService } from '../services/delete-feature.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class DeleteFeatureFactory {
  static create(params: UrlParams): DeleteFeatureGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new DeleteFeatureService(executeRequest, authToken, params)
  }
}
