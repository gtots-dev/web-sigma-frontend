import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostGroupLaneGateway } from '../../domain/gateways/post-group-lane.gateway'
import type { GroupLaneInterface } from '../../domain/interfaces/group-lane.interface'

export class PostGroupLaneService implements PostGroupLaneGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, groupId }: UrlParams,
    laneId: GroupLaneInterface
  ): HttpRequestConfig<{ lane_id: GroupLaneInterface }> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${groupId}/lanes`,
      data: { lane_id: laneId },
      requiresAuth: true
    }
  }

  async execute(laneId: GroupLaneInterface): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, laneId
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
