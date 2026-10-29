import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetContractFilesRouterApiService } from '../services/get-contract-files-router-api.service'
import type { GetContractFilesRouterApiGateway } from '../../domain/gateways/get-contract-files-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractFilesRouterApiFactory {
  static create(params: UrlParams): GetContractFilesRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetContractFilesRouterApiService(executeRequest, params)
  }
}
