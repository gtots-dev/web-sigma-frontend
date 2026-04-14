import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TwoFactorInterface } from '../interfaces/two-factor.interface'
import type { OAuthResponseInterface } from '@/modules/authentication/domain/interfaces/o-auth-response.interface'

export interface PostTwoFactorVerifyGateway {
  execute(
    twoFactor: TwoFactorInterface
  ): Promise<HttpResponseInterface<OAuthResponseInterface>>
}
