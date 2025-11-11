import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetPermissionProfileFeatureRouterApiService } from '../services/get-permission-profile-feature-router-api.service'
import type { GetPermissionProfileFeatureRouterApiGateway } from '../../domain/gateways/get-permission-profile-feature-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetPermissionProfileFeatureRouterApiFactory {
  static create(
    params: UrlParams
  ): GetPermissionProfileFeatureRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetPermissionProfileFeatureRouterApiService(
      executeRequest,
      params
    )
  }
}
