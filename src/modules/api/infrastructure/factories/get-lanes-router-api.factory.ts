import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetLanesRouterApiServiceInterface } from '../../domain/interfaces/get-lanes-router-api-service.interface'
import { GetLanesRouterApiService } from '../services/get-lanes-router-api.service'

export class GetLanesRouterApiFactory {
  static create(params: UrlParams): GetLanesRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetLanesRouterApiService(executeRequest, params)
  }
}
