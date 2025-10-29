import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PatchUserRouterApiService } from '../services/patch-user-router-api.service'
import type { PatchUserRouterApiServiceInterface } from '../../domain/interfaces/patch-user-router-api-service.interface'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchUserRouterApiFactory {
  static create(params: UrlParams): PatchUserRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PatchUserRouterApiService(
      executeRequest,
      formDataConvert,
      params
    )
  }
}
