import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { GetOperationsRouterApiServiceInterface } from '../../domain/interfaces/get-operations-router-api-service.interface'

export class GetOperationsRouterApiService
  implements GetOperationsRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig<null, null> {
    return {
      method: 'GET',
      url: 'api/operation'
    }
  } 

  async execute(): Promise<OperationEntity[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { success, data, status }: HttpResponse<OperationEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
    return data
  }
}
