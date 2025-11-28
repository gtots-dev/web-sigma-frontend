import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponsePointValidator } from '@/modules/points/domain/validators/http-response-point.validator'
import type { PostPointLaneRouterApiGateway } from '../../domain/gateways/post-point-lane-router-api.gateway'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'

export class PostPointLaneRouterApiService
  implements PostPointLaneRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, contractId, pointId }: UrlParams,
    laneId: LaneEntity['id']
  ): HttpRequestConfig {
    return {
      method: 'POST',
      data: laneId,
      url: `api/operations/${operationId}/contracts/${contractId}/points/${pointId}/lanes`
    }
  }

  async execute(laneId: LaneEntity['id']): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, laneId)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponsePointValidator.validate(success, status)
  }
}
