import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PostPermissionProfileRouterApiGateway } from '../../domain/gateways/post-permission-profile-router-api.gateway'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPermissionProfileRouterApiService
  implements PostPermissionProfileRouterApiGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId }: UrlParams,
    permissionProfile: PermissionProfileInterface
  ): HttpRequestConfig<PermissionProfileInterface> {
    return {
      method: 'POST',
      data: permissionProfile,
      url: `api/operations/${operationId}/permissions`
    }
  }
  async execute(
    permissionProfile: PermissionProfileInterface
  ): Promise<PermissionProfileEntity> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      permissionProfile
    )
    const { success, data, status }: HttpResponse<PermissionProfileEntity> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
    return data
  }
}
