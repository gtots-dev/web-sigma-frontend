import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PutUserRouterApiService } from '../services/put-user-router-api.service'
import type { PutUserRouterApiServiceInterface } from '../../domain/interfaces/put-user-router-api-service.interface'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PutUserRouterApiFactory {
  static create(): PutUserRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PutUserRouterApiService(executeRequest, formDataConvert)
  }
}
