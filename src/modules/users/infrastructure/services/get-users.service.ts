import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { UserInterface } from '../../domain/interfaces/user.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { GetUsersServiceInterface } from '../../domain/interfaces/get-users-service.interface'

export class GetUsersService implements GetUsersServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    ids?: number[]
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/users`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      },
      params: { id: ids }
    }
  }

  async execute(
    token: TokenEntities,
    ids?: number[]
  ): Promise<UserInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, ids)
    const { success, data, status }: HttpResponse<UserInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
    return data
  }
}
