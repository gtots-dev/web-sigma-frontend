import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PostPermissionProfileServiceInterface } from '../../domain/interfaces/post-permission-profile-service.interface'
import { HttpResponsePermissionProfileValidator } from '../../domain/validators/http-response-permission-profile.validator'
import { PermissionProfileEntity } from '../../domain/entities/permission-profile.entity'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'

export class PostPermissionProfileService
  implements PostPermissionProfileServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    permissionProfileFormData: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/perm-profiles/`,
      data: permissionProfileFormData,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    permissionProfile: PermissionProfileInterface
  ): Promise<PermissionProfileInterface> {
    const enrichedPermissionProfile = new PermissionProfileEntity(
      permissionProfile.name,
      permissionProfile.description,
      permissionProfile.operation_id
    )
    const permissionProfileFormDataConverted = this.formData.execute({
      ...enrichedPermissionProfile
    })
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      permissionProfileFormDataConverted
    )
    const { success, data, status }: HttpResponse<PermissionProfileInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
    return data
  }
}
