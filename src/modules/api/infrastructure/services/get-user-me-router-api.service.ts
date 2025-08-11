import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { UserEntity } from '../../../users/domain/entities/user.entity'
import { UserFactory } from '@/modules/users/infrastructure/factories/user.factory'
import type { GetUserMeRouterApiServiceInterface } from '../../domain/interfaces/get-user-me-router-api-service.interface'

export class GetUserMeRouterApiService
  implements GetUserMeRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: 'api/user/me'
    }
  }

  async execute(): Promise<UserEntity> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { success, data, status }: HttpResponse<UserEntity> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, data, status)
    return UserFactory.create(data)
  }
}
