import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PostPermissionProfileGateway } from '../../domain/gateways/post-permission-profile.gateway'
import { PermissionProfileEntity } from '../../domain/entities/permission-profile.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class PostPermissionProfileService
  implements PostPermissionProfileGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId }: UrlParams,
    token: TokenEntities,
    permissionProfile: PermissionProfileEntity
  ): HttpRequestConfig<PermissionProfileEntity> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/perm-profiles`,
      data: permissionProfile,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    permissionProfile: PermissionProfileEntity
  ): Promise<PermissionProfileInterface> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      permissionProfile
    )
    const { data }: HttpResponseInterface<PermissionProfileInterface> =
      await this.httpRequest.execute(settingsAuthHTTP)
    return data
  }
}
