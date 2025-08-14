import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import type { PutUserStatusRouterApiServiceInterface } from '../../domain/interfaces/put-user-status-router-api-service.interface'
import { PutUserStatusRouterApiService } from '../services/put-user-status-router-api.service'

export class PutUserStatusRouterApiFactory {
  static create(): PutUserStatusRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PutUserStatusRouterApiService(executeRequest, formDataConvert)
  }
}
