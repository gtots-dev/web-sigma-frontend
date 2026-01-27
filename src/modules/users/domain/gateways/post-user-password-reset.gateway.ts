import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'
import type { UserPasswordResetInterface } from '../interfaces/user-password-reset.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface PostUserPasswordResetGateway {
  execute(
    userPasswordReset: UserPasswordResetInterface
  ): Promise<HttpResponseInterface<void> | HttpResponseErrorInterface>
}
