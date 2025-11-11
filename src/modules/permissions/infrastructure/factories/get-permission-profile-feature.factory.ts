import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetPermissionProfileFeatureGateway } from '../../domain/gateways/get-permission-profile-feature.gateway'
import { GetPermissionProfileFeatureService } from '../services/get-permission-profile-feature.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class GetPermissionProfileFeatureFactory {
  static create(params: UrlParams): GetPermissionProfileFeatureGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetPermissionProfileFeatureService(
      executeRequest,
      authToken,
      params
    )
  }
}
