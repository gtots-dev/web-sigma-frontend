import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseLaneValidator } from '@/modules/lanes/domain/validators/http-response-lane.validator'
import type { PatchLaneRouterApiServiceInterface } from '../../domain/interfaces/patch-lane-router-api-service.interface'

export class PatchLaneRouterApiService
  implements PatchLaneRouterApiServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEntity
  ): HttpRequestConfig<LaneEntity> {
    return {
      method: 'PATCH',
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
