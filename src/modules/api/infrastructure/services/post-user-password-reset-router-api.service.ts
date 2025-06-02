import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostUserPasswordResetRouterApiServiceInterface } from '../../domain/interfaces/post-user-password-reset-router-api-service.interface'
import type { UserPasswordResetInterface } from '@/modules/users/domain/interfaces/user-password-reset.interface'
import { HttpResponseUserPasswordResetValidator } from '@/modules/users/domain/validators/http-response-user-password-reset.validator'

export class PostUserPasswordResetRouterApiService
  implements PostUserPasswordResetRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    userPasswordReset: UserPasswordResetInterface
  ): HttpRequestConfig<UserPasswordResetInterface> {
    return {
      method: 'POST',
      data: userPasswordReset,
      url: 'api/user/password-reset'
    }
  }

  async execute(userPasswordReset: UserPasswordResetInterface): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(userPasswordReset)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseUserPasswordResetValidator.validate(success, status)
  }
}
