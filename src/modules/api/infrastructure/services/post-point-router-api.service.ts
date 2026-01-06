import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'
import type { PostPointRouterApiGateway } from '../../domain/gateways/post-point-router-api.gateway'

export class PostPointRouterApiService implements PostPointRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    point: PointEntity
  ): HttpRequestConfig {
    return {
      method: 'POST',
      data: point,
      url: `api/operations/${operationId}/contracts/${contractId}/points`
    }
  }

  async execute(point: PointEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, point)
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
