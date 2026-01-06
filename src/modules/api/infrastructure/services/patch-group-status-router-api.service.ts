import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupEnableAndDisableInterface } from '@/modules/groups/domain/interfaces/group-enable-and-disable.interface'
import type { PatchGroupStatusRouterApiGateway } from '../../domain/gateways/patch-group-status-router-api.gateway'

export class PatchGroupStatusRouterApiService implements PatchGroupStatusRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, groupId }: UrlParams,
    groupEnableAndDisable: GroupEnableAndDisableInterface
  ): HttpRequestConfig<GroupEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      data: groupEnableAndDisable,
      url: `api/operations/${operationId}/contracts/${contractId}/groups/${groupId}/status`
    }
  }

  async execute(
    groupEnableAndDisable: GroupEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      groupEnableAndDisable
    )
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
