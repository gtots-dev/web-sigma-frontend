import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetStatusProcessingUnitIgnoreRouterApiGateway } from '../../domain/gateways/get-status-processing-unit-ignore-router-api.gateway'
import type { StatusProcessingUnitIgnoreInterface } from '@/modules/status-processing-units/domain/interfaces/status-processing-unit-ignore.interface'

export class GetStatusProcessingUnitIgnoreRouterApiService implements GetStatusProcessingUnitIgnoreRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    const upId = this.params.upId ?? this.params.processingUnitId
    return {
      method: 'GET',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${upId}/status-list-ignore`
    }
  }

  async execute(): Promise<
    HttpResponseInterface<StatusProcessingUnitIgnoreInterface[]>
  > {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
