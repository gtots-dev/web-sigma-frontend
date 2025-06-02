import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PutPasswordResetService } from '../services/put-password-reset.service'
import type { PutPasswordResetServiceInterface } from '../../domain/interfaces/put-password-reset-service.interface'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PutPasswordResetFactory {
  static create(): PutPasswordResetServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PutPasswordResetService(executeRequest, formDataConvert)
  }
}
