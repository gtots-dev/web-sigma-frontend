import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchPointRouterApiGateway } from '../../domain/gateways/patch-point-router-api.gateway'

export class PatchPointRouterApiService implements PatchPointRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    point: PointEntity
  ): HttpRequestConfig<PointEntity> {
    return {
      method: 'PATCH',
      data: point,
      url: `api/operations/${operationId}/contracts/${contractId}/points`
    }
  }

  async execute(point: PointEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, point)
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
