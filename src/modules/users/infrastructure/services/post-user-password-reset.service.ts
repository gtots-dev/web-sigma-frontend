import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostUserPasswordResetGateway } from '../../domain/gateways/post-user-password-reset.gateway'
import type { UserPasswordResetInterface } from '../../domain/interfaces/user-password-reset.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostUserPasswordResetService implements PostUserPasswordResetGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId }: UrlParams,
    token: TokenEntities,
    userPasswordReset: UserPasswordResetInterface
  ): HttpRequestConfig<UserPasswordResetInterface> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/users/${userId}/passwords`,
      data: userPasswordReset,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(userPasswordReset: UserPasswordResetInterface): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      userPasswordReset
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
