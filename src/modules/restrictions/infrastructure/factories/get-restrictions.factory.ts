import { GetRestrictionsService } from '../services/get-restrictions.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

export class GetRestrictionsFactory {
  static create(params: UrlParams): GetRestrictionsService {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetRestrictionsService(executeRequest, params)
  }
}
