import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetLanesStatusListGateway } from '../../domain/gateways/get-lanes-status-list.gateway'
import type { LaneStatusInterface } from '../../domain/interfaces/lane-status.interface'

export class GetLanesStatusListService implements GetLanesStatusListGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/lanes/status-list`,
      requiresAuth: true
    }
  }

  async execute(): Promise<HttpResponseInterface<LaneStatusInterface[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
