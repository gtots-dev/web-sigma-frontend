import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUsersRouterApiService } from '../services/get-users-router-api.service'

export class GetUsersRouterApiFactory {
  static create() {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUsersRouterApiService(executeRequest)
  }
}
