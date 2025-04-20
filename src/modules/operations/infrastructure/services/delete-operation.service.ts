import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseOperationValidator } from '../../domain/validators/http-response-operation.validator'
import type { DeleteSelectionOperationServiceInterface } from '../../domain/interfaces/delete-selection-operation-service.interface'

export class DeleteSelectionOperationService
  implements DeleteSelectionOperationServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'DELETE',
      url: 'api/select-operation',
      headers: { 'Content-Type': 'application/json' }
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { success, data, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseOperationValidator.validate(success, data, status)
  }
}
