import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { LaneStatusInterface } from '@/modules/lanes/domain/interfaces/lane-status.interface'
import type { GetLanesStatusListGateway } from '@/modules/lanes/domain/gateways/get-lanes-status-list.gateway'

export class GetLanesStatusListRouterApiService implements GetLanesStatusListGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/lanes/status-list`
    }
  }

  async execute(): Promise<HttpResponseInterface<LaneStatusInterface[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
