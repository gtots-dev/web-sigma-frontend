import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PointEnableAndDisableInterface } from '../../domain/interfaces/point-enable-and-disable.interface'
import type { PatchPointStatusGateway } from '../../domain/gateways/patch-point-status.gateway'
export class PatchPointStatusService implements PatchPointStatusGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    pointEnabledAndDisabled: PointEnableAndDisableInterface
  ): HttpRequestConfig<PointEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/points/${pointEnabledAndDisabled.id}/status`,
      data: pointEnabledAndDisabled,
      requiresAuth: true
    }
  }

  async execute(
    pointEnabledAndDisabled: PointEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, pointEnabledAndDisabled
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
