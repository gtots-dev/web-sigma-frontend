import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupEnableAndDisableInterface } from '../../domain/interfaces/group-enable-and-disable.interface'
import type { PatchGroupStatusGateway } from '../../domain/gateways/patch-group-status.gateway'
export class PatchGroupStatusService implements PatchGroupStatusGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    groupEnabledAndDisabled: GroupEnableAndDisableInterface
  ): HttpRequestConfig<GroupEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${groupEnabledAndDisabled.id}/status`,
      data: groupEnabledAndDisabled,
      requiresAuth: true
    }
  }

  async execute(
    groupEnabledAndDisabled: GroupEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, groupEnabledAndDisabled
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
