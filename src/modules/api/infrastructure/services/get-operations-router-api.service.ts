import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { GetOperationsRouterApiGateway } from '../../domain/gateways/get-operations-router-api.gateway'

export class GetOperationsRouterApiService implements GetOperationsRouterApiGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig<null, null> {
    return {
      method: 'GET',
      url: 'api/operations'
    }
  }

  async execute(): Promise<OperationEntity[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { data }: HttpResponseInterface<OperationEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
