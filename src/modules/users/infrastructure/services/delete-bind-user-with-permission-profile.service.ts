import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { DeleteBindUserWithPermissionProfileGateway } from '../../domain/gateways/delete-bind-user-with-permission-profile.gateway'

import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class DeleteBindUserWithPermissionProfileService implements DeleteBindUserWithPermissionProfileGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId, permissionProfileId }: UrlParams,
    token: TokenEntities
  ): HttpRequestConfig<FormData> {
    return {
      method: 'DELETE',
      url: `/operations/${operationId}/users/${userId}/perm-profiles/${permissionProfileId}`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, token)
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
