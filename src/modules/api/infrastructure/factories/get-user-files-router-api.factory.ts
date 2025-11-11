import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserFilesRouterApiService } from '../services/get-user-files-router-api.service'
import type { GetUserFilesRouterApiGateway } from '../../domain/gateways/get-user-files-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserFilesRouterApiFactory {
  static create(params: UrlParams): GetUserFilesRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserFilesRouterApiService(executeRequest, params)
  }
}
