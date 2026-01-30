import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchUserStatusRouterApiGateway } from '../../domain/gateways/patch-user-status-router-api.gateway'

export class PatchUserStatusRouterApiService implements PatchUserStatusRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId }: UrlParams,
    userEnableAndDisable: UserEnableAndDisableInterface
  ): HttpRequestConfig<UserEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      data: userEnableAndDisable,
      url: `api/operations/${operationId}/users/${userEnableAndDisable.id}/status`
    }
  }
  async execute(
    userEnableAndDisable: UserEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      userEnableAndDisable
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
