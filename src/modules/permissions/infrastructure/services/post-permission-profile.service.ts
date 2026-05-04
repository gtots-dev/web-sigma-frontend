import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PostPermissionProfileGateway } from '../../domain/gateways/post-permission-profile.gateway'
import { PermissionProfileEntity } from '../../domain/entities/permission-profile.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostPermissionProfileService
  implements PostPermissionProfileGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    permissionProfile: PermissionProfileEntity
  ): HttpRequestConfig<PermissionProfileEntity> {
    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/perm-profiles`,
      data: permissionProfile,
      requiresAuth: true
    }
  }

  async execute(
    permissionProfile: PermissionProfileEntity
  ): Promise<HttpResponseInterface<PermissionProfileInterface>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(permissionProfile)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
