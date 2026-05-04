import type { OAuthResponseInterface } from '@/modules/authentication/domain/interfaces/o-auth-response.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TwoFactorInterface } from '@/modules/two-factor/domain/interfaces/two-factor.interface'

export interface PostTwoFactorVerifyRouterApiGateway {
  execute(
    twoFactor: TwoFactorInterface
  ): Promise<HttpResponseInterface<OAuthResponseInterface>>
}
