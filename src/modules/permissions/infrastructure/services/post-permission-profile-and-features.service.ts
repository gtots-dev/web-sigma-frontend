import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PostPermissionProfileAndFeaturesServiceInterface } from '../../domain/interfaces/post-permission-profile-and-features-service.interface'
import { HttpResponsePermissionProfileValidator } from '../../domain/validators/http-response-permission-profile.validator'
import type { PermissionProfileAndFeaturesInterface } from '../../domain/interfaces/permission-profile-and-features'

export class PostPermissionProfileAndFeaturesService
  implements PostPermissionProfileAndFeaturesServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): HttpRequestConfig<PermissionProfileAndFeaturesInterface> {
    return {
      method: 'POST',
      url: `/perm-profiles/all-in-one`,
      data: permissionProfileAndFeatures,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    permissionProfileAndFeatures: PermissionProfileAndFeaturesInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      permissionProfileAndFeatures
    )

    const { success, status }: HttpResponse<PermissionProfileInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
