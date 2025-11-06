import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchProcessingUnitRouterApiService } from '../services/patch-processing-unit-router-api.service'
import type { PatchProcessingUnitRouterApiServiceInterface } from '../../domain/interfaces/patch-processing-unit-router-api-service.interface'

export class PatchProcessingUnitRouterApiFactory {
  static create(
    params: UrlParams
  ): PatchProcessingUnitRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchProcessingUnitRouterApiService(executeRequest, params)
  }
}
