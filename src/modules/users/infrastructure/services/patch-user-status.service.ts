import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PatchUserStatusGateway } from '../../domain/gateways/patch-user-status.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserEnableAndDisableInterface } from '../../domain/interfaces/user-enable-and-disable.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
export class PatchUserStatusService implements PatchUserStatusGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    userEnableAndDisable: UserEnableAndDisableInterface
  ): HttpRequestConfig<UserEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${this.params.operationId}/users/${userEnableAndDisable.id}/status`,
      data: userEnableAndDisable,
      requiresAuth: true
    }
  }

  async execute(
    userEnableAndDisable: UserEnableAndDisableInterface
  ): Promise<HttpResponseInterface<void>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(userEnableAndDisable
    )
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
