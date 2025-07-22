import type { GetUserMeServiceInterface } from '../../domain/interfaces/get-user-me.service.interface'
import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import { UserFactory } from '../factories/user.factory'
import type { UserEntity } from '../../domain/entities/user.entity'

export class GetUserMeService implements GetUserMeServiceInterface {
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(token: TokenEntities): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/users/me`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(token: TokenEntities): Promise<UserEntity> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token)
    const { success, data, status }: HttpResponse<UserEntity> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, data, status)
    return UserFactory.create(data)
  }
}
