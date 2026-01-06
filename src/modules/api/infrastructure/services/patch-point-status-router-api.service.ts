import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PointEnableAndDisableInterface } from '@/modules/points/domain/interfaces/point-enable-and-disable.interface'
import type { PatchPointStatusRouterApiGateway } from '../../domain/gateways/patch-point-status-router-api.gateway'

export class PatchPointStatusRouterApiService implements PatchPointStatusRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, pointId }: UrlParams,
    pointEnableAndDisable: PointEnableAndDisableInterface
  ): HttpRequestConfig<PointEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      data: pointEnableAndDisable,
      url: `api/operations/${operationId}/contracts/${contractId}/points/${pointId}/status`
    }
  }

  async execute(
    pointEnableAndDisable: PointEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      pointEnableAndDisable
    )
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
