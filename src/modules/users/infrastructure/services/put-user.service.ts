import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { UserInterface } from '../../domain/interfaces/user.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { PutUserServiceInterface } from '../../domain/interfaces/put-user-service.interface'
import type { UserEntity } from '../../domain/entities/user.entity'

export class PutUserService implements PutUserServiceInterface {
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userId: UserEntity['id'],
    user: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PATCH',
      url: `/users/${userId}`,
      data: user,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    userId: UserEntity['id'],
    user: FormData
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, userId, user)
    const { success, status }: HttpResponse<UserInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
