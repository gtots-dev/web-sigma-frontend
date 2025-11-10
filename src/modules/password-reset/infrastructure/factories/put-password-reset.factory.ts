import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PutPasswordResetService } from '../services/put-password-reset.service'
import type { PutPasswordResetGateway } from '../../domain/gateways/put-password-reset-service.gateway'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PutPasswordResetFactory {
  static create(): PutPasswordResetGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PutPasswordResetService(executeRequest, formDataConvert)
  }
}
