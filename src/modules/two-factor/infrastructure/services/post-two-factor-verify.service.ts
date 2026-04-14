import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { PostTwoFactorVerifyGateway } from '../../domain/gateways/post-two-factor-verify.gateway'
import type { TwoFactorInterface } from '../../domain/interfaces/two-factor.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OAuthResponseInterface } from '@/modules/authentication/domain/interfaces/o-auth-response.interface'

export class PostTwoFactorVerifyService implements PostTwoFactorVerifyGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider
  ) {}

  getHttpRequestConfig(
    twoFactor: TwoFactorInterface,
    token: TokenEntities
  ): HttpRequestConfig<TwoFactorInterface> {
    return {
      method: 'POST',
      data: twoFactor,
      url: '/verify-2fa',
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    twoFactor: TwoFactorInterface
  ): Promise<HttpResponseInterface<OAuthResponseInterface>> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(twoFactor, token)
    console.log(JSON.stringify(twoFactor))
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
