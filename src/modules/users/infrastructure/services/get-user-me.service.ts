import type { GetUserMeGateway } from '../../domain/gateways/get-user-me.gateway'
import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

import type { UserEntity } from '../../domain/entities/user.entity'
import type { UserPermissionsInterface } from '../../domain/interfaces/user-permissions.interface'

export class GetUserMeService implements GetUserMeGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/users/me`,
      requiresAuth: true
    }
  }

  async execute(): Promise<UserEntity & UserPermissionsInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const {
      data
    }: HttpResponseInterface<UserEntity & UserPermissionsInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    return data
  }
}
