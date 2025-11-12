import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetUserPermissionProfileContractRouterApiGateway } from '../../domain/gateways/get-user-permission-profiles-contracts-router-api.gateway'
import type { UserPermissionProfileContractInterface } from '@/modules/users/domain/interfaces/user-permission-profile-contract.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserPermissionProfileContractRouterApiService
  implements GetUserPermissionProfileContractRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    userId,
    permissionProfileId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/users/${userId}/permission-profiles/${permissionProfileId}/contracts`
    }
  }

  async execute(): Promise<UserPermissionProfileContractInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponse<UserPermissionProfileContractInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
