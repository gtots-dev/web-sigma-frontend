import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OAuthResponseInterface } from '../../domain/interfaces/o-auth-response.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { ExecuteRequest } from '../../../shared/infrastructure/services/execute-request.service'
import type { UserCredentialsInterface } from '../../domain/interfaces/user-credentials.interface'
import { TokenEntities } from '../../domain/entities/token.entity'
import type { JwtValidator } from '../../../shared/domain/validators/jwt.validator'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import type { TokenGateway } from '../../domain/gateways/token-service.gateway'

export class TokenService implements TokenGateway {
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
    const settingsAuthHTTP = this.getHttpRequestConfig(credentials)

    const { data }: HttpResponseInterface<OAuthResponseInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)

    this.jwtValidator.validate(data.access_token)

    return new TokenEntities(data.access_token, data.token_type)
  }
}
