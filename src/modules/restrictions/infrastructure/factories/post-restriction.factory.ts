import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostRestrictionService } from '../services/post-restriction.service'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

export class PostRestrictionFactory {
  static create(params: UrlParams) {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostRestrictionService(executeRequest, params)
  }
}
