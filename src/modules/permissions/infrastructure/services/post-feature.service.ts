import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PostFeatureServiceInterface } from '../../domain/interfaces/post-feature-service.interface'
import { HttpResponsePermissionProfileValidator } from '../../domain/validators/http-response-permission-profile.validator'

export class PostFeatureService implements PostFeatureServiceInterface {
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    featureFormData: FormData,
    permissionProfileId: number
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/perm-profiles/${permissionProfileId}/features`,
      data: featureFormData,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    features: number[],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void> {
    const formData = new FormData()

    features.forEach((featureId) => {
      formData.append('feature_id', String(featureId))
    })

    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      formData,
      permissionProfileId
    )

    const { success, status }: HttpResponse<PermissionProfileInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)

    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
