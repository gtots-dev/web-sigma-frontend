import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUsersRouterApiService } from '../services/get-users-router-api.service'
import type { GetUsersRouterApiServiceInterface } from '../../domain/interfaces/get-users-router-api-service.interface'

export class GetUsersRouterApiFactory {
  static create(): GetUsersRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUsersRouterApiService(executeRequest)
  }
}
