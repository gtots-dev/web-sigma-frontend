import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchViolationRouterApiService } from '../services/patch-violation-router-api.service'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

export class PatchViolationRouterApiFactory {
  static create(params: UrlParams) {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchViolationRouterApiService(executeRequest, params)
  }
}
