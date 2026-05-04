import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { GetUserGateway } from '../../domain/gateways/get-user.gateway'
import type { UserInterface } from '../../domain/interfaces/user.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

import { UserFactory } from '../factories/user.factory'

export class GetUserService implements GetUserGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    userId: number
  ): HttpRequestConfig<null, { id: number[] }> {
    return {
      method: 'GET',
      url: `/users/${userId}`,
      requiresAuth: true
    }
  }

  async execute(userId: number): Promise<UserInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig(userId)
    const { data }: HttpResponseInterface<UserInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return UserFactory.create(data)
  }
}
