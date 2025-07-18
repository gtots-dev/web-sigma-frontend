import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import { PostPermissionProfileAndFeaturesService } from '../services/post-permission-profile-and-features.service'
import type { PostPermissionProfileAndFeaturesServiceInterface } from '../../domain/interfaces/post-permission-profile-and-features-service.interface'

export class PostPermissionProfileAndFeaturesFactory {
  static create(): PostPermissionProfileAndFeaturesServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PostPermissionProfileAndFeaturesService(
      executeRequest,
      formDataConvert
    )
  }
}
