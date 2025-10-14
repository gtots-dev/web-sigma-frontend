import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import type { PostProcessingUnitRouterApiServiceInterface } from '../../domain/interfaces/post-processing-unit-router-api-service.interface'
import { HttpResponseProcessingUnitValidator } from '@/modules/processing-units/domain/validators/http-response-processing-unit.validator'

export class PostProcessingUnitRouterApiService
  implements PostProcessingUnitRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    processingUnit: ProcessingUnitEntity
  ): HttpRequestConfig<ProcessingUnitEntity> {
    return {
      method: 'POST',
      data: processingUnit,
      url: 'api/processing-unit'
    }
  }

  async execute(processingUnit: ProcessingUnitEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(processingUnit)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseProcessingUnitValidator.validate(success, status)
  }
}
