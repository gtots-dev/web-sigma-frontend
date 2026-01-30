import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import type { GetProcessingUnitRouterApiGateway } from '../../domain/gateways/get-processing-unit-router-api.gateway'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class GetProcessingUnitRouterApiService implements GetProcessingUnitRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/processing-units`
    }
  }

  async execute(): Promise<HttpResponseInterface<ProcessingUnitEntity[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
