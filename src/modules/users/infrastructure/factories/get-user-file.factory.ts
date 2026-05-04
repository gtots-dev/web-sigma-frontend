import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserFileService } from '../services/get-user-file.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserFileFactory {
  static create(params: UrlParams) {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserFileService(executeRequest, params)
  }
}
