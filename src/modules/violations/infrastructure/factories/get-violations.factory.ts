import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetViolationsService } from '../services/get-violations.service'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

export class GetViolationsFactory {
  static create(params: UrlParams) {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetViolationsService(executeRequest, params)
  }
}
