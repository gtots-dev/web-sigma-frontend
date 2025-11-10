import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteFeatureRouterApiGateway } from '../../domain/gateways/delete-feature-router-api.gateway'
import { DeleteBindUserWithPermissionProfileRouterApiService } from '../services/delete-bind-user-with-permission-profile-router-api.service'

export class DeleteBindUserWithPermissionProfileRouterApiFactory {
  static create(): DeleteFeatureRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteBindUserWithPermissionProfileRouterApiService(
      executeRequest
    )
  }
}
