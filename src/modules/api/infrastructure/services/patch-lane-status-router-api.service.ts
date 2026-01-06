import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEnableAndDisableInterface } from '@/modules/lanes/domain/interfaces/lane-enable-and-disable.interface'
import type { PatchLaneStatusRouterApiGateway } from '../../domain/gateways/patch-lane-status-router-api.gateway'

export class PatchLaneStatusRouterApiService implements PatchLaneStatusRouterApiGateway {
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
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
