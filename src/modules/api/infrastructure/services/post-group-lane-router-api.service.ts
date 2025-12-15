import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseGroupValidator } from '@/modules/groups/domain/validators/http-response-group.validator'
import type { PostGroupLaneRouterApiGateway } from '../../domain/gateways/post-group-lane-router-api.gateway'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export class PostGroupLaneRouterApiService
  implements PostGroupLaneRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, contractId, groupId }: UrlParams,
    laneId: LaneEntity['id']
  ): HttpRequestConfig {
    return {
      method: 'POST',
      data: laneId,
      url: `api/operations/${operationId}/contracts/${contractId}/groups/${groupId}/lanes`
    }
  }

  async execute(laneId: LaneEntity['id']): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, laneId)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseGroupValidator.validate(success, status)
  }
}
