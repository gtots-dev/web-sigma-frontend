import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { GetLanesServiceInterface } from '../../domain/interfaces/get-lanes-service.interfaces'
import { GetLanesService } from '../services/get-lanes.service'


export class GetLanesFactory {
  static create(params: UrlParams): GetLanesServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetLanesService(executeRequest, authToken, params)
  }
}
