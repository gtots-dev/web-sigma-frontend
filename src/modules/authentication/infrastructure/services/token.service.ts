import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OAuthResponseInterface } from '../../domain/interfaces/o-auth-response.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { ExecuteRequest } from '../../../shared/infrastructure/services/execute-request.service'
import type { UserCredentialsInterface } from '../../domain/interfaces/user-credentials.interface'
import { TokenEntities } from '../../domain/entities/token.entities'
import { HttpResponseTokenValidator } from '../../domain/validators/http-response-token.validator'
import { CredentialsValidator } from '../../domain/validators/credentials.validator'
import type { TokenServiceInterface } from '../../domain/interfaces/token-service.interface'
import type { TokenValidator } from '../../domain/validators/token.validator'

export class TokenService implements TokenServiceInterface {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly tokenValidator: TokenValidator
  ) {}

  getHttpRequestConfig(
    credentials: UserCredentialsInterface
  ): HttpRequestConfig {
    return {
      method: 'POST',
      url: '/oauth2/token',
      data: credentials,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  }

  async getToken(
    credentials: UserCredentialsInterface
  ): Promise<TokenEntities> {
    CredentialsValidator.validate(credentials)

    const settingsAuthHTTP = this.getHttpRequestConfig(credentials)

    const response: HttpResponse<OAuthResponseInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)

    HttpResponseTokenValidator.validate(
      response.success,
      response.data,
      response.status
    )

    this.tokenValidator.validate(response.data.access_token)

    return new TokenEntities(
      response.data.access_token,
      response.data.token_type
    )
  }
}
