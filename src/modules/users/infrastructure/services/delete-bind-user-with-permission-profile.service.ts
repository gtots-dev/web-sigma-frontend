import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { DeleteBindUserWithPermissionProfileServiceInterface } from '../../domain/interfaces/delete-bind-user-with-permission-profile.interface'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'

export class DeleteBindUserWithPermissionProfileService
  implements DeleteBindUserWithPermissionProfileServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    permissionProfileId: PermissionProfileEntity['id'],
    userId: UserEntity['id']
  ): HttpRequestConfig<FormData> {
    return {
      method: 'DELETE',
      url: `/users/${userId}/perm-profiles/${permissionProfileId}/`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    permissionProfileId: PermissionProfileEntity['id'],
    userId: UserEntity['id']
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      permissionProfileId,
      userId
    )
    const { success, status }: HttpResponse<void> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
