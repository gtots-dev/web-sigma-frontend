import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import type { GetProcessingUnitRouterApiServiceInterface } from '../../domain/interfaces/get-processing-unit-router-api-service.interface'
import { HttpResponseProcessingUnitValidator } from '@/modules/processing-units/domain/validators/http-response-processing-unit.validator'

export class GetProcessingUnitRouterApiService
  implements GetProcessingUnitRouterApiServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    contractId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/contracts/${contractId}/processing-units`
    }
  }

  async execute(): Promise<ProcessingUnitEntity[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, data, status }: HttpResponse<ProcessingUnitEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseProcessingUnitValidator.validate(success, status)
    return data
  }
}
