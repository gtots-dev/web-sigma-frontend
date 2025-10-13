import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { DeleteFeatureServiceInterface } from '../../domain/interfaces/delete-feature-service.interface'
import { HttpResponsePermissionProfileValidator } from '../../domain/validators/http-response-permission-profile.validator'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'

export class DeleteFeatureService implements DeleteFeatureServiceInterface {
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    featureId: FeaturesInterface['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ): HttpRequestConfig<FormData> {
    return {
      method: 'DELETE',
      url: `/perm-profiles/${permissionProfileId}/features/${featureId}`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    featureId: FeaturesInterface['id'],
    permissionProfileId: PermissionProfileInterface['id']
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      featureId,
      permissionProfileId
    )
    const { success, status }: HttpResponse<PermissionProfileInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
