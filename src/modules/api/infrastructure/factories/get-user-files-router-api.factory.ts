import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserFilesRouterApiService } from '../services/get-user-files-router-api.service'
import type { GetUserFilesRouterApiServiceInterface } from '../../domain/interfaces/get-user-files-router-api-service.interface'

export class GetUserFilesRouterApiFactory {
  static create(): GetUserFilesRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserFilesRouterApiService(executeRequest)
  }
}
