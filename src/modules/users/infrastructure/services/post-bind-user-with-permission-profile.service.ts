import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostBindUserWithPermissionProfileGateway } from '../../domain/gateways/post-bind-user-with-permission-profile.gateway'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class PostBindUserWithPermissionProfileService implements PostBindUserWithPermissionProfileGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    permissionProfileIdsFormData: PermissionProfileEntity['id'][],
    { operationId, userId }: UrlParams
  ): HttpRequestConfig<{ perm_profile_id: PermissionProfileEntity['id'][] }> {
    return {
      method: 'POST',
      data: {
        perm_profile_id: permissionProfileIdsFormData
      },
      url: `/operations/${operationId}/users/${userId}/perm-profiles`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    permissionProfileIds: PermissionProfileEntity['id'][]
  ): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      permissionProfileIds,
      this.params
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
