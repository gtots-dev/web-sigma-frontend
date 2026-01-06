import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostBindUserWithPermissionProfileRouterApiGateway } from '../../domain/gateways/post-bind-user-with-permission-profile-router-api.gateway'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostBindUserWithPermissionProfileRouterApiService implements PostBindUserWithPermissionProfileRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, userId }: UrlParams,
    permissionProfileIds: PermissionProfileEntity['id'][]
  ): HttpRequestConfig<PermissionProfileEntity['id'][]> {
    return {
      method: 'POST',
      data: permissionProfileIds,
      url: `api/operations/${operationId}/users/${userId}/permission-profiles`
    }
  }
  async execute(
    permissionProfileIds: PermissionProfileEntity['id'][]
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      permissionProfileIds
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
