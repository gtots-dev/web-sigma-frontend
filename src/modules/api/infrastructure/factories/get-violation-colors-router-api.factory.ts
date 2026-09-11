import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetViolationColorsRouterApiService } from '../services/get-violation-colors-router-api.service'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

export class GetViolationColorsRouterApiFactory {
  static create(params: UrlParams) {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetViolationColorsRouterApiService(executeRequest, params)
  }
}
