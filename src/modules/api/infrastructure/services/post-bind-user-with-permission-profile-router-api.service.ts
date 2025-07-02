import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { PostBindUserWithPermissionProfileRouterApiServiceInterface } from '../../domain/interfaces/post-bind-user-with-permission-profile-router-api-service.interface'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export class PostBindUserWithPermissionProfileRouterApiService
  implements PostBindUserWithPermissionProfileRouterApiServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    userId: UserEntity['id'],
    permissionProfileIds: PermissionProfileInterface['id'][]
  ): HttpRequestConfig<number[]> {
    return {
      method: 'POST',
      data: permissionProfileIds,
      url: `api/user/${userId}/permission-profile`
    }
  }
  async execute(
    userId: UserEntity['id'],
    permissionProfileIds: PermissionProfileInterface['id'][]
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      userId,
      permissionProfileIds
    )
    const { success, status }: HttpResponse<PermissionProfileEntity> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
