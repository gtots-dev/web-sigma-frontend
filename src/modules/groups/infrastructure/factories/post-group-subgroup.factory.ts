import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { PostGroupSubgroupGateway } from '../../domain/gateways/post-group-subgroup.gateway'
import { PostGroupSubgroupService } from '../services/post-group-subgroup.service'

export class PostGroupSubgroupFactory {
  static create(params: UrlParams): PostGroupSubgroupGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostGroupSubgroupService(executeRequest, authToken, params)
  }
}
