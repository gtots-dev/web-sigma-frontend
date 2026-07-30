import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostInfractionsGateway } from '../../domain/gateways/post-infractions.gateway'
import { PostInfractionsService } from '../services/post-infractions.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostInfractionsFactory {
  static create(params: UrlParams): PostInfractionsGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostInfractionsService(executeRequest, params)
  }
}
