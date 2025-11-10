import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PatchContractGateway } from '../../domain/gateways/patch-contract.gateway'
import { PatchContractService } from '../services/path-contract.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class PatchContractFactory {
  static create(params: UrlParams): PatchContractGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchContractService(executeRequest, authToken, params)
  }
}
