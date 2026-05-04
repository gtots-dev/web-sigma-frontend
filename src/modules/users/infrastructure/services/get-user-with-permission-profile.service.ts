import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

import type { PermissionProfileWithUserInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-user.interface'
import type { GetUserWithPermissionProfileGateway } from '../../domain/gateways/get-user-with-permission-profile.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserWithPermissionProfileService implements GetUserWithPermissionProfileGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId }: UrlParams
  ): HttpRequestConfig<FormData> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/users/${userId}/perm-profiles`,
      requiresAuth: true
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
