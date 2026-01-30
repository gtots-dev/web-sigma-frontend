import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { DeleteBindUserWithPermissionProfileRouterApiGateway } from '../../domain/gateways/delete-bind-user-with-permission-profile-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteBindUserWithPermissionProfileRouterApiService implements DeleteBindUserWithPermissionProfileRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    userId,
    permissionProfileId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'DELETE',
      url: `api/operations/${operationId}/users/${userId}/permission-profiles/${permissionProfileId}`
    }
  }
  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
