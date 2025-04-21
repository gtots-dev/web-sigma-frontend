import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { UserEntity } from '../../../users/domain/entities/user.entity'
import type { PostUserRouterApiServiceInterface } from '../../domain/interfaces/post-user-router-api-service.interface'

export class PostUserRouterApiService
  implements PostUserRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(user: UserEntity): HttpRequestConfig<UserEntity> {
    return {
      method: 'POST',
      data: user,
      url: 'api/user'
    }
  }

  async execute(user: UserEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(user)
    const { success, data, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, data, status)
  }
}
