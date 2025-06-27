import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostPermissionProfileServiceInterface } from '../../domain/interfaces/post-permission-profile-service.interface'
import { PostPermissionProfileService } from '../services/post-permission-profile.service'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PostPermissionProfileFactory {
  static create(): PostPermissionProfileServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PostPermissionProfileService(executeRequest, formDataConvert)
  }
}
