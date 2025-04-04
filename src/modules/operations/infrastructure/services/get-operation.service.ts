import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseOperationValidator } from '../../domain/validators/http-response-operation.validator'
import type { GetSelectionOperationServiceInterface } from '../../domain/interfaces/get-selection-operation-service.interface'
import { OperationEntities } from '../../domain/entities/operation.entity'

export class GetSelectionOperationService
  implements GetSelectionOperationServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: 'api/select-operation',
    }
  }

  async execute(): Promise<OperationInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { success, data, status }: HttpResponse<OperationInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseOperationValidator.validate(success, data, status)
    return new OperationEntities(data.id, data.name)
  }
}
