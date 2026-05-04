import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostBindUserWithPermissionProfileGateway } from '../../domain/gateways/post-bind-user-with-permission-profile.gateway'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostBindUserWithPermissionProfileService implements PostBindUserWithPermissionProfileGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    permissionProfileIdsFormData: PermissionProfileEntity['id'][],
    { operationId, userId }: UrlParams
  ): HttpRequestConfig<{ perm_profile_id: PermissionProfileEntity['id'][] }> {
    return {
      method: 'POST',
      data: {
        perm_profile_id: permissionProfileIdsFormData
      },
      url: `/operations/${operationId}/users/${userId}/perm-profiles`,
      requiresAuth: true
    }
  }

  async execute(
    permissionProfileIds: PermissionProfileEntity['id'][]
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(permissionProfileIds,
      this.params
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
