import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { DeleteBindUserWithPermissionProfileRouterApiService } from '../services/delete-bind-user-with-permission-profile-router-api.service'
import type { DeleteBindUserWithPermissionProfileRouterApiGateway } from '../../domain/gateways/delete-bind-user-with-permission-profile-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteBindUserWithPermissionProfileRouterApiFactory {
  static create(
    params: UrlParams
  ): DeleteBindUserWithPermissionProfileRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteBindUserWithPermissionProfileRouterApiService(
      executeRequest,
      params
    )
  }
}
