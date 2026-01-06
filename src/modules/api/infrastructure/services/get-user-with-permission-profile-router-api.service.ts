import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetUserWithPermissionProfileRouterApiGateway } from '../../domain/gateways/get-user-with-permission-profile-router-api.gateway'
import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserWithPermissionProfileRouterApiService implements GetUserWithPermissionProfileRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({ operationId, userId }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/users/${userId}/permission-profiles`
    }
  }

  async execute(): Promise<PermissionProfileWithUserInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const {
      data
    }: HttpResponseInterface<PermissionProfileWithUserInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
