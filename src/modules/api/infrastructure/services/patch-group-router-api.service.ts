import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchGroupRouterApiGateway } from '../../domain/gateways/patch-group-router-api.gateway'

export class PatchGroupRouterApiService implements PatchGroupRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    group: GroupEntity
  ): HttpRequestConfig<GroupEntity> {
    return {
      method: 'PATCH',
      data: group,
      url: `api/operations/${operationId}/contracts/${contractId}/groups`
    }
  }

  async execute(group: GroupEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, group)
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
