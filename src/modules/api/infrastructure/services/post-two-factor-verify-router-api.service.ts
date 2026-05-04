import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostTwoFactorVerifyRouterApiGateway } from '../../domain/gateways/post-two-factor-verify-router-api.gateway'
import type { TwoFactorInterface } from '@/modules/two-factor/domain/interfaces/two-factor.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OAuthResponseInterface } from '@/modules/authentication/domain/interfaces/o-auth-response.interface'

export class PostTwoFactorVerifyRouterApiService implements PostTwoFactorVerifyRouterApiGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(twoFactor: TwoFactorInterface): HttpRequestConfig {
    return {
      method: 'POST',
      data: twoFactor,
      url: `api/2fa/verify`
    }
  }

  async execute(
    twoFactor: TwoFactorInterface
  ): Promise<HttpResponseInterface<OAuthResponseInterface>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(twoFactor)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
