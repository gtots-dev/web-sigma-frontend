import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import type { PatchLaneGateway } from '../../domain/gateways/patch-lane.gateway'

export class PatchLaneService implements PatchLaneGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  private normalizeLane(lane: LaneEntity): LaneEntity {
    const cfg =
      typeof lane.cfg === 'string'
        ? lane.cfg.trim() === ''
          ? {}
          : JSON.parse(lane.cfg)
        : lane.cfg

    return { ...lane, cfg }
  }

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    lane: LaneEntity
  ): HttpRequestConfig<LaneEntity> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/ups/${processingUnitId}/lanes/${lane.id}`,
      data: this.normalizeLane(lane),
      requiresAuth: true
    }
  }

  async execute(lane: LaneEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, lane)
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
