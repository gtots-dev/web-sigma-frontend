import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEnableAndDisableInterface } from '../../domain/interfaces/lane-enable-and-disable.interface'
import type { PatchLaneStatusGateway } from '../../domain/gateways/patch-lane-status.gateway'
export class PatchLaneStatusService implements PatchLaneStatusGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    laneEnabledAndDisabled: LaneEnableAndDisableInterface
  ): HttpRequestConfig<LaneEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/ups/${processingUnitId}/lanes/${laneEnabledAndDisabled.id}/status`,
      data: laneEnabledAndDisabled,
      requiresAuth: true
    }
  }

  async execute(
    laneEnabledAndDisabled: LaneEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, laneEnabledAndDisabled
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
