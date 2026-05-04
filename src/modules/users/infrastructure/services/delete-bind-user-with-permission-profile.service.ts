import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { DeleteBindUserWithPermissionProfileGateway } from '../../domain/gateways/delete-bind-user-with-permission-profile.gateway'

import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteBindUserWithPermissionProfileService implements DeleteBindUserWithPermissionProfileGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId, permissionProfileId }: UrlParams
  ): HttpRequestConfig<FormData> {
    return {
      method: 'DELETE',
      url: `/operations/${operationId}/users/${userId}/perm-profiles/${permissionProfileId}`,
      requiresAuth: true
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
