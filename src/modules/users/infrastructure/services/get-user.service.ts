import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { GetUserGateway } from '../../domain/gateways/get-user.gateway'
import type { UserInterface } from '../../domain/interfaces/user.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

import { UserFactory } from '../factories/user.factory'

export class GetUserService implements GetUserGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userId: number
  ): HttpRequestConfig<null, { id: number[] }> {
    return {
      method: 'GET',
      url: `/users/${userId}`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(token: TokenEntities, userId: number): Promise<UserInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, userId)
    const { data }: HttpResponseInterface<UserInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return UserFactory.create(data)
  }
}
