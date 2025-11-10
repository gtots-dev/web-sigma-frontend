import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { GetLanesGateway } from '../../domain/gateways/get-lanes.gateway'
import { GetLanesService } from '../services/get-lanes.service'


export class GetLanesFactory {
  static create(params: UrlParams): GetLanesGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetLanesService(executeRequest, authToken, params)
  }
}
