import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { DeleteBindUserWithPermissionProfileRouterApiServiceInterface } from '../../domain/interfaces/delete-bind-user-with-permission-profile-router-api-service.interface'

export class DeleteBindUserWithPermissionProfileRouterApiService
  implements DeleteBindUserWithPermissionProfileRouterApiServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    userId: UserEntity['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ): HttpRequestConfig {
    return {
      method: 'DELETE',
      url: `api/user/${userId}/permission-profile/${permissionProfileId}`
    }
  }
  async execute(
    userId: UserEntity['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      userId,
      permissionProfileId
    )
    const { success, status }: HttpResponse<PermissionProfileEntity> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
