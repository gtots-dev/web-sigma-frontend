import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PointEntity } from '../../domain/entities/point.entity'
import type { PostPointGateway } from '../../domain/gateways/post-point.gateway'

export class PostPointService implements PostPointGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  private normalizePoint(point: PointEntity): PointEntity {
    const cfg =
      typeof point.cfg === 'string'
        ? point.cfg.trim() === ''
          ? {}
          : JSON.parse(point.cfg)
        : point.cfg

    return { ...point, cfg }
  }

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    point: PointEntity
  ): HttpRequestConfig<PointEntity> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/points`,
      data: this.normalizePoint(point),
      requiresAuth: true
    }
  }

  async execute(point: PointEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, point
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
