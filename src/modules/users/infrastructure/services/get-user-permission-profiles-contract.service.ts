import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserPermissionProfileContractInterface } from '../../domain/interfaces/user-permission-profile-contract.interface'
import type { GetUserPermissionProfileContractGateway } from '../../domain/gateways/get-user-permission-profiles-contract.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserPermissionProfileContractService
  implements GetUserPermissionProfileContractGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId, permissionProfileId }: UrlParams
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/operations/${operationId}/users/${userId}/perm-profiles/${permissionProfileId}/contracts`,
      requiresAuth: true
    }
  }

  async execute(): Promise<UserPermissionProfileContractInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<UserPermissionProfileContractInterface[]> =
      await this.httpRequest.execute(settingsAuthHTTP)
    return data
  }
}
