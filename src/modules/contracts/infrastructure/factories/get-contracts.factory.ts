import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetContractsService } from '../services/get-contracts.service'
import type { GetContractsGateway } from '../../domain/gateways/get-contracts.gateway'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractsFactory {
  static create(params: UrlParams): GetContractsGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetContractsService(executeRequest, authToken, params)
  }
}
