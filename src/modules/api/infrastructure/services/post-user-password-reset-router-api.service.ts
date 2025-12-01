import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostUserPasswordResetRouterApiGateway } from '../../domain/gateways/post-user-password-reset-router-api.gateway'
import type { UserPasswordResetInterface } from '@/modules/users/domain/interfaces/user-password-reset.interface'
import { HttpResponseUserPasswordResetValidator } from '@/modules/users/domain/validators/http-response-user-password-reset.validator'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostUserPasswordResetRouterApiService
  implements PostUserPasswordResetRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId }: UrlParams,
    userPasswordReset: UserPasswordResetInterface
  ): HttpRequestConfig<UserPasswordResetInterface> {
    return {
      method: 'POST',
      data: userPasswordReset,
      url: `api/operations/${operationId}/users/${userId}/passwords`
    }
  }

  async execute(userPasswordReset: UserPasswordResetInterface): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      userPasswordReset
    )
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseUserPasswordResetValidator.validate(success, status)
  }
}
