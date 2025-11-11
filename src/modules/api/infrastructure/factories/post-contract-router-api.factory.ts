import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostContractRouterApiService } from '../services/post-contract-router-api.service'
import type { PostContractRouterApiGateway } from '../../domain/gateways/post-contract-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostContractRouterApiFactory {
  static create(params: UrlParams): PostContractRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostContractRouterApiService(executeRequest, params)
  }
}
