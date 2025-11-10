import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import { HttpResponseProcessingUnitValidator } from '@/modules/processing-units/domain/validators/http-response-processing-unit.validator'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchProcessingUnitStatusRouterApiGateway } from '../../domain/gateways/patch-processing-unit-status-router-api.gateway'
import type { ProcessingUnitEnableAndDisableInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-enable-and-disable.interface'

export class PatchProcessingUnitStatusRouterApiService
  implements PatchProcessingUnitStatusRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    processingUnitEnableAndDisable: ProcessingUnitEnableAndDisableInterface
  ): HttpRequestConfig<ProcessingUnitEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      data: processingUnitEnableAndDisable,
      url: `api/operations/${operationId}/contracts/${contractId}/processing-units/${processingUnitId}/status`
    }
  }

  async execute(
    processingUnitEnableAndDisable: ProcessingUnitEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      processingUnitEnableAndDisable
    )
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseProcessingUnitValidator.validate(success, status)
  }
}
