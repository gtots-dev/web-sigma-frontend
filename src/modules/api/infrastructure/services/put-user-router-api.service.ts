import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { PutUserRouterApiServiceInterface } from '../../domain/interfaces/put-user-router-api-service.interface'
import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'

export class PutUserRouterApiService
  implements PutUserRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(user: UserInterface): HttpRequestConfig<UserInterface> {
    return {
      method: 'PUT',
      data: user,
      url: 'api/user'
    }
  }

  async execute(user: UserInterface): Promise<UserInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig(user)
    const { success, data, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, data, status)
    return data
  }
}
