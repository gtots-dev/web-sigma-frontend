import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import { HttpResponseLaneValidator } from '@/modules/lanes/domain/validators/http-response-lane.validator'
import type { PostLaneRouterApiGateway } from '../../domain/gateways/post-lane-router-api.gateway'

export class PostLaneRouterApiService
  implements PostLaneRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEntity
  ): HttpRequestConfig {
    return {
      method: 'POST',
      data: lane,
      url: `api/operations/${operationId}/contracts/${contractId}/processing-units/${processingUnitId}/lanes`
    }
  }

  async execute(lane: LaneEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, lane)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseLaneValidator.validate(success, status)
  }
}
