import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostContractFilesRouterApiGateway } from '../../domain/gateways/post-contract-files-router-api.gateway'
import { PostContractFilesRouterApiService } from '../services/post-contract-files-router-api.service'

export class PostContractFilesRouterApiFactory {
  static create(params: UrlParams): PostContractFilesRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostContractFilesRouterApiService(executeRequest, params)
  }
}
