import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchRestrictionRouterApiService } from '../services/patch-restriction-router-api.service'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

export class PatchRestrictionRouterApiFactory {
  static create(params: UrlParams) {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchRestrictionRouterApiService(executeRequest, params)
  }
}
