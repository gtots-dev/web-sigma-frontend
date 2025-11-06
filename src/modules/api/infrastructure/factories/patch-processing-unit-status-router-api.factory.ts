import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchProcessingUnitStatusRouterApiServiceInterface } from '../../domain/interfaces/patch-processing-unit-status-router-api-service.interface'
import { PatchProcessingUnitStatusRouterApiService } from '../services/patch-processing-unit-status-router-api.service'

export class PatchProcessingUnitStatusRouterApiFactory {
  static create(
    params: UrlParams
  ): PatchProcessingUnitStatusRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchProcessingUnitStatusRouterApiService(executeRequest, params)
  }
}
