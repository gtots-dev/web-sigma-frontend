import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostGroupPointRouterApiGateway } from '../../domain/gateways/post-group-point-router-api.gateway'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

export class PostGroupPointRouterApiService implements PostGroupPointRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, contractId, groupId }: UrlParams,
    pointId: PointEntity['id']
  ): HttpRequestConfig {
    return {
      method: 'POST',
      data: pointId,
      url: `api/operations/${operationId}/contracts/${contractId}/groups/${groupId}/points`
    }
  }

  async execute(pointId: PointEntity['id']): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, pointId)
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
