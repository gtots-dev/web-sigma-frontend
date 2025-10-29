import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import type { PatchUserStatusRouterApiServiceInterface } from '../../domain/interfaces/patch-user-status-router-api-service.interface'
import { PatchUserStatusRouterApiService } from '../services/patch-user-status-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchUserStatusRouterApiFactory {
  static create(params: UrlParams): PatchUserStatusRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()

    return new PatchUserStatusRouterApiService(
      executeRequest,
      formDataConvert,
      params
    )
  }
}
