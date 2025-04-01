import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseOperationValidator } from '../../domain/validators/http-response-operation.validator'
import type { SetSelectionOperationServiceInterface } from '../../domain/interfaces/set-selection-operation-service.interface'

export class SetSelectionOperationService
  implements SetSelectionOperationServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(operation: OperationInterface): HttpRequestConfig {
    return {
      method: 'POST',
      url: 'api/select-operation',
      data: JSON.stringify(operation),
      headers: { 'Content-Type': 'application/json' }
    }
  }

  async setSelectionOperation(operation: OperationInterface): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(operation)
    const { success, data, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseOperationValidator.validate(success, data, status)
  }
}
