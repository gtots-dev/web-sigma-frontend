import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import type { PutPermissionProfileStatusRouterApiServiceInterface } from '../../domain/interfaces/put-permission-profile-status-router-api-service.interface'
import { PutPermissionProfileStatusRouterApiService } from '../services/put-permission-profile-status-router-api.service'

export class PutPermissionProfileStatusRouterApiFactory {
  static create(): PutPermissionProfileStatusRouterApiServiceInterface {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PutPermissionProfileStatusRouterApiService(
      executeRequest,
      formDataConvert
    )
  }
}
