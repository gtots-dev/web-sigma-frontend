import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserPermissionProfileContractInterface } from '../../domain/interfaces/user-permission-profile-contract.interface'
import type { GetUserPermissionProfileContractGateway } from '../../domain/gateways/get-user-permission-profiles-contract.gateway'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserPermissionProfileContractService
  implements GetUserPermissionProfileContractGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId, permissionProfileId }: UrlParams,
    token: TokenEntities
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/operations/${operationId}/users/${userId}/perm-profiles/${permissionProfileId}/contracts`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<UserPermissionProfileContractInterface[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, token)
    const { data }: HttpResponseInterface<UserPermissionProfileContractInterface[]> =
      await this.httpRequest.execute(settingsAuthHTTP)
    return data
  }
}
