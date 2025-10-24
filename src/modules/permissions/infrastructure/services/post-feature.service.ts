import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PostFeatureServiceInterface } from '../../domain/interfaces/post-feature-service.interface'
import { HttpResponsePermissionProfileValidator } from '../../domain/validators/http-response-permission-profile.validator'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'

export class PostFeatureService implements PostFeatureServiceInterface {
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    features: FeaturesInterface['id'][],
    permissionProfileId: PermissionProfileInterface['id']
  ): HttpRequestConfig<FeaturesInterface['id'][]> {
    return {
      method: 'POST',
      url: `/perm-profiles/${permissionProfileId}/features`,
      data: features,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    features: FeaturesInterface['id'][],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      features,
      permissionProfileId
    )

    const { success, status }: HttpResponse<PermissionProfileInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)

    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
