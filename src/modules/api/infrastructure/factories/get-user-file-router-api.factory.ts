import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserFileRouterApiService } from '../services/get-user-file-router-api.service'
import type { GetUserFileRouterApiServiceInterface } from '../../domain/interfaces/get-user-file-router-api-service.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserFileRouterApiFactory {
  static create(params: UrlParams): GetUserFileRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserFileRouterApiService(executeRequest, params)
  }
}
