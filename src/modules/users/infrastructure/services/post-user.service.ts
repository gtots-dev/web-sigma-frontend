import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { PostUserGateway } from '../../domain/interfaces/post-user.gateway'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostUserService implements PostUserGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId }: UrlParams,
    token: TokenEntities,
    user: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/users`,
      data: user,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(user: FormData): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, token, user)
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
