import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { PostUserServiceInterface } from '../../domain/interfaces/post-user-service.interface'

export class PostUserService implements PostUserServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    user: FormData,
    operationSelectedId?: number
  ): HttpRequestConfig<FormData> {
    user.append('operation_id', String(operationSelectedId))
    return {
      method: 'POST',
      url: `/users/`,
      data: user,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    user: FormData,
    operationSelectedId?: number
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      user,
      operationSelectedId
    )
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
