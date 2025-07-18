import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserMeRouterApiService } from '../services/get-user-me-router-api.service'
import type { GetUserMeRouterApiServiceInterface } from '../../domain/interfaces/get-user-me-router-api-service.interface'

export class GetUserMeRouterApiFactory {
  static create(): GetUserMeRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserMeRouterApiService(executeRequest)
  }
}
