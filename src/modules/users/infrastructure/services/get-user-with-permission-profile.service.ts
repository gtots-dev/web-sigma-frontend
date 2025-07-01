import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../../domain/entities/user.entity'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import type { GetUserWithPermissionProfileServiceInterface } from '../../domain/interfaces/get-user-with-permission-profile-service.interface'

export class GetUserWithPermissionProfileService
  implements GetUserWithPermissionProfileServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userId: UserEntity['id']
  ): HttpRequestConfig<FormData> {
    return {
      method: 'GET',
      url: `/users/${userId}/perm-profiles/`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    userId: UserEntity['id']
  ): Promise<PermissionProfileWithUserInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, userId)
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
