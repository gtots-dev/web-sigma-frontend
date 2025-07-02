import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { PostBindUserWithPermissionProfileServiceInterface } from '../../domain/interfaces/post-bind-user-with-permission-profile.interface'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'

export class PostBindUserWithPermissionProfileService
  implements PostBindUserWithPermissionProfileServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    permissionProfileIdsFormData: FormData,
    userId: UserEntity['id']
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      data: permissionProfileIdsFormData,
      url: `/users/${userId}/perm-profiles`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    permissionProfileIds: PermissionProfileEntity['id'][],
    userId: UserEntity['id']
  ): Promise<void> {
    const formData = new FormData()
    permissionProfileIds.forEach((permissionProfileIds) =>
      formData.append('perm_profile_id', String(permissionProfileIds))
    )
    const settingsAuthHTTP = this.getHttpRequestConfig(token, formData, userId)
    const { success, status }: HttpResponse<void> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
