import { GetViolationColorsService } from '../services/get-violation-colors.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'

export class GetViolationColorsFactory {
  static create(params: UrlParams): GetViolationColorsService {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetViolationColorsService(executeRequest, params)
  }
}
