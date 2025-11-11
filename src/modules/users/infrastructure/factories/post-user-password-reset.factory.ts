import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostUserPasswordResetGateway } from '../../domain/gateways/post-user-password-reset.gateway'
import { PostUserPasswordResetService } from '../services/post-user-password-reset.service'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
export class PostUserPasswordResetFactory {
  static create(params: UrlParams): PostUserPasswordResetGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const formDataConvert = FormDataConverterFactory.create()
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostUserPasswordResetService(
      executeRequest,
      formDataConvert,
      authToken,
      params
    )
  }
}
