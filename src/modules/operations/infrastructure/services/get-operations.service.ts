import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { GetOperationsGateway } from '../../domain/gateways/get-operations.gateway'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OperationEntity } from '../../domain/entities/operation.entity'

export class GetOperationsService implements GetOperationsGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: '/operations',
      requiresAuth: true
    }
  }

  async execute(): Promise<HttpResponseInterface<OperationEntity[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
