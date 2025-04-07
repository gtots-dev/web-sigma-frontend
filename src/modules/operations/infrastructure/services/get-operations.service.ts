import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { GetOperationsServiceInterface } from '../../domain/interfaces/get-operations-service.interface'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseOperationValidator } from '../../domain/validators/http-response-operation.validator'

export class GetOperationsService implements GetOperationsServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(params?: number[]): HttpRequestConfig<null, number[]> {
    return {
      method: 'GET',
      url: '/operations',
      params
    }
  }

  async execute(params?: number[]): Promise<OperationInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(params)
    const { success, data, status }: HttpResponse<OperationInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseOperationValidator.validate(success, data, status)
    return data
  }
}
