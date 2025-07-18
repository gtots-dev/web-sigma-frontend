import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../../../users/domain/entities/user.entity'
import type { GetUserWithPermissionProfileRouterApiServiceInterface } from '../../domain/interfaces/get-user-with-permission-profile-router-api-service.interface'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import { HttpResponseUserValidator } from '@/modules/users/domain/validators/http-response-user.validator'

export class GetUserWithPermissionProfileRouterApiService
  implements GetUserWithPermissionProfileRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(userId: UserEntity['id']): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/user/${userId}/permission-profile`
    }
  }

  async execute(
    userId: UserEntity['id']
  ): Promise<PermissionProfileWithUserInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(userId)
    const {
      success,
      data,
      status
    }: HttpResponse<PermissionProfileWithUserInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
    return data
  }
}
