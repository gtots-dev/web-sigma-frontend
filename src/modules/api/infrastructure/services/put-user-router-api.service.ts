import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { PutUserRouterApiServiceInterface } from '../../domain/interfaces/put-user-router-api-service.interface'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export class PutUserRouterApiService
  implements PutUserRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(user: UserWithFiles): HttpRequestConfig<UserWithFiles> {
    return {
      method: 'PUT',
      data: user,
      url: 'api/user'
    }
  }

  async execute(user: UserWithFiles): Promise<UserEntity> {
    const settingsAuthHTTP = this.getHttpRequestConfig(user)
    const { success, data, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, data, status)
    return data
  }
}
