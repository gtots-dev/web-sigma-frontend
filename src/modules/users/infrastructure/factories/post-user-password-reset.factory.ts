import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostUserPasswordResetServiceInterface } from '../../domain/interfaces/post-user-password-reset-service.interface'
import { PostUserPasswordResetService } from '../services/post-user-password-reset.service'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PostUserPasswordResetFactory {
  static create(): PostUserPasswordResetServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const formDataConvert = FormDataConverterFactory.create()
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostUserPasswordResetService(executeRequest, formDataConvert)
  }
}
