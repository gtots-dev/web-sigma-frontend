import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { StatusListItem } from '@/modules/processing-units/domain/gateways/get-processing-unit-status-list.gateway'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class GetProcessingUnitStatusListRouterApiService {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/status-list`
    }
  }

  async execute(): Promise<HttpResponseInterface<StatusListItem[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
