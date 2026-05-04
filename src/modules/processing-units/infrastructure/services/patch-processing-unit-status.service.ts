import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ProcessingUnitEnableAndDisableInterface } from '../../domain/interfaces/processing-unit-enable-and-disable.interface'
import type { PatchProcessingUnitStatusGateway } from '../../domain/gateways/patch-processing-unit-status.gateway'

export class PatchProcessingUnitStatusService implements PatchProcessingUnitStatusGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    processingUnitEnabledAndDisabled: ProcessingUnitEnableAndDisableInterface
  ): HttpRequestConfig<ProcessingUnitEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/ups/${processingUnitId}/status`,
      data: processingUnitEnabledAndDisabled,
      requiresAuth: true
    }
  }

  async execute(
    processingUnitEnabledAndDisabled: ProcessingUnitEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, processingUnitEnabledAndDisabled
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
