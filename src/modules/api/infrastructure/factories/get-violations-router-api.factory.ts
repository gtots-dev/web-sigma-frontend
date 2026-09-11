import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetViolationsRouterApiService } from '../services/get-violations-router-api.service'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

export class GetViolationsRouterApiFactory {
  static create(params: UrlParams) {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetViolationsRouterApiService(executeRequest, params)
  }
}
