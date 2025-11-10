import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserMeRouterApiService } from '../services/get-user-me-router-api.service'
import type { GetUserMeRouterApiGateway } from '../../domain/gateways/get-user-me-router-api.gateway'

export class GetUserMeRouterApiFactory {
  static create(): GetUserMeRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserMeRouterApiService(executeRequest)
  }
}
