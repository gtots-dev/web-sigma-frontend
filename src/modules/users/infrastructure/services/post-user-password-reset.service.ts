import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostUserPasswordResetGateway } from '../../domain/gateways/post-user-password-reset.gateway'
import type { UserPasswordResetInterface } from '../../domain/interfaces/user-password-reset.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PostUserPasswordResetService
  implements PostUserPasswordResetGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    userPasswordReset: UserPasswordResetInterface
  ): HttpRequestConfig<UserPasswordResetInterface> {
    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/users/${this.params.userId}/passwords`,
      data: userPasswordReset,
      requiresAuth: true
    }
  }

  async execute(
    userPasswordReset: UserPasswordResetInterface
  ): Promise<HttpResponseInterface<void>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(userPasswordReset)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
