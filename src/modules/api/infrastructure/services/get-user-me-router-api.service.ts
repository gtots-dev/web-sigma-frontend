import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../../../users/domain/entities/user.entity'
import { UserFactory } from '@/modules/users/infrastructure/factories/user.factory'
import type { GetUserMeRouterApiGateway } from '../../domain/gateways/get-user-me-router-api.gateway'

export class GetUserMeRouterApiService implements GetUserMeRouterApiGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: 'api/user/me'
    }
  }

  async execute(): Promise<UserEntity> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { data }: HttpResponseInterface<UserEntity> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return UserFactory.create(data)
  }
}
