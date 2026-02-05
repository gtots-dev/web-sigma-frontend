import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostUserFilesRouterApiGateway } from '../../domain/gateways/post-user-files-router-api.gateway'
import { PostUserFilesRouterApiService } from '../services/post-user-files-router-api.service'

export class PostUserFilesRouterApiFactory {
  static create(params: UrlParams): PostUserFilesRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const formDataConvert = FormDataConverterFactory.create()
    return new PostUserFilesRouterApiService(
      executeRequest,
      formDataConvert,
      params
    )
  }
}
