import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseLaneValidator } from '@/modules/lanes/domain/validators/http-response-lane.validator'
import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'
import type { PatchLaneStatusRouterApiServiceInterface } from '../../domain/interfaces/patch-lane-status-router-api-service.interface'

export class PatchLaneStatusRouterApiService
  implements PatchLaneStatusRouterApiServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId, laneId }: UrlParams,
    laneEnableAndDisable: LaneEnableAndDisableInterface
  ): HttpRequestConfig<LaneEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      data: laneEnableAndDisable,
      url: `api/operations/${operationId}/contracts/${contractId}/processing-units/${processingUnitId}/lanes/${laneId}/status`
    }
  }

  async execute(
    laneEnableAndDisable: LaneEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      laneEnableAndDisable
    )
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseLaneValidator.validate(success, status)
  }
}
