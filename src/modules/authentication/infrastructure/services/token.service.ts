import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OAuthResponseInterface } from '../../domain/interfaces/o-auth-response.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { ExecuteRequest } from '../../../shared/infrastructure/services/execute-request.service'
import type { UserCredentialsInterface } from '../../domain/interfaces/user-credentials.interface'
import { TokenEntities } from '../../domain/entities/token.entity'
import { HttpResponseTokenValidator } from '../../domain/validators/http-response-token.validator'
import { CredentialsValidator } from '../../domain/validators/credentials.validator'
import type { TokenServiceInterface } from '../../domain/interfaces/token-service.interface'
import type { JwtValidator } from '../../../shared/domain/validators/jwt.validator'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class TokenService implements TokenServiceInterface {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly jwtValidator: JwtValidator
  ) {}

  getHttpRequestConfig(
    credentials: UserCredentialsInterface
  ): HttpRequestConfig<FormData> {
    const converterJsonToFormData = FormDataConverterFactory.create()
    const credentialsFormData = converterJsonToFormData.execute(credentials)

    return {
      method: 'POST',
      url: '/oauth2/token',
      data: credentialsFormData
    }
  }

  async getToken(
    credentials: UserCredentialsInterface
  ): Promise<TokenEntities> {
    CredentialsValidator.validate(credentials)
    const settingsAuthHTTP = this.getHttpRequestConfig(credentials)

    const { success, data, status }: HttpResponse<OAuthResponseInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)

    HttpResponseTokenValidator.validate(success, data, status)

    this.jwtValidator.validate(data.access_token)

    return new TokenEntities(data.access_token, data.token_type)
  }
}
