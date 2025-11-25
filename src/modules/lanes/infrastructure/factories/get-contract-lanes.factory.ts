import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { GetContractLanesGateway } from '../../domain/gateways/get-contract-lanes.gateway'
import { GetContractLanesService } from '../services/get-contract-lanes.service'


export class GetContractLanesFactory {
  static create(params: UrlParams): GetContractLanesGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetContractLanesService(executeRequest, authToken, params)
  }
}
