import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PutContractStatusServiceInterface } from '../../domain/interfaces/put-contract-status-service.interface'
import { PutContractStatusService } from '../services/put-contract-status.service'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PutContractStatusFactory {
  static create(params: UrlParams): PutContractStatusServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PutContractStatusService(executeRequest, authToken, params)
  }
}
