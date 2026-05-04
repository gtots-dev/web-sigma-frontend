import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostGroupGateway } from '../../domain/gateways/post-group.gateway'
import { PostGroupService } from '../services/post-group.service'

export class PostGroupFactory {
  static create(params: UrlParams): PostGroupGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostGroupService(executeRequest, params)
  }
}
