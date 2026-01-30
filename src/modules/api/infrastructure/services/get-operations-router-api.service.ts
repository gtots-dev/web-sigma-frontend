import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { GetOperationsRouterApiGateway } from '../../domain/gateways/get-operations-router-api.gateway'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class GetOperationsRouterApiService
  implements GetOperationsRouterApiGateway
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: 'api/operations'
    }
  }

  async execute(): Promise<HttpResponseInterface<OperationEntity[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
