import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostTwoFactorVerifyGateway } from '../../domain/gateways/post-two-factor-verify.gateway'
import type { TwoFactorInterface } from '../../domain/interfaces/two-factor.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OAuthResponseInterface } from '@/modules/authentication/domain/interfaces/o-auth-response.interface'

export class PostTwoFactorVerifyService implements PostTwoFactorVerifyGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
  ) {}

  getHttpRequestConfig({
    otp_code,
    remember_device
  }: TwoFactorInterface): HttpRequestConfig<TwoFactorInterface> {
    return {
      method: 'POST',
      data: {
        otp_code,
        remember_device
      },
      url: '/oauth2/token/2fa',
      requiresAuth: true
    }
  }

  async execute(
    twoFactor: TwoFactorInterface
  ): Promise<
    HttpResponseInterface<OAuthResponseInterface, HttpHeadersInterface>
  > {
    const settingsAuthHTTP = this.getHttpRequestConfig(twoFactor)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
