import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostGroupSubgroupGateway } from '../../domain/gateways/post-group-subgroup.gateway'
import type { GroupSubgroupInterface } from '../../domain/interfaces/group-subgroup.interface'

export class PostGroupSubgroupService implements PostGroupSubgroupGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, groupId }: UrlParams,
    subgroupId: GroupSubgroupInterface
  ): HttpRequestConfig<{ subgroup_id: GroupSubgroupInterface }> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${groupId}/subgroups`,
      data: { subgroup_id: subgroupId },
      requiresAuth: true
    }
  }

  async execute(subgroupId: GroupSubgroupInterface): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, subgroupId
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
