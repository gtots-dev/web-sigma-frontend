import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PatchContractRouterApiService } from '../services/patch-contract-router-api.service'
import type { PatchContractRouterApiServiceInterface } from '../../domain/interfaces/put-contract-router-api-service.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchContractRouterApiFactory {
  static create(params: UrlParams): PatchContractRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchContractRouterApiService(executeRequest, params)
  }
}
