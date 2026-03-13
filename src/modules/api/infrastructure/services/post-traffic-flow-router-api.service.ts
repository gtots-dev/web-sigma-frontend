import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostTrafficFlowRouterApiGateway } from '../../domain/gateways/post-traffic-flow-router-api.gateway'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TrafficFlowInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowFiltersInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-filters.interface'

export class PostTrafficFlowRouterApiService implements PostTrafficFlowRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    filters: TrafficFlowFiltersInterface
  ): HttpRequestConfig {
    return {
      method: 'POST',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/traffic-flow`,
      data: filters
    }
  }
  async execute(
    filters: TrafficFlowFiltersInterface
  ): Promise<HttpResponseInterface<TrafficFlowInterface>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(filters)
    return await this.httpRequest.execute<TrafficFlowInterface>(
      settingsAuthHTTP
    )
  }
}
