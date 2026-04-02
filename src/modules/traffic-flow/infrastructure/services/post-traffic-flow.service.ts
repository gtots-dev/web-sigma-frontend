import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { TrafficFlowInterface } from '../../domain/interfaces/traffic-flow.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { PostTrafficFlowServiceGateway } from '../../domain/gateways/post-traffic-flow-service.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { TrafficFlowFiltersInterface } from '../../domain/interfaces/traffic-flow-filters.interface'

export class PostTrafficFlowService implements PostTrafficFlowServiceGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    filters: TrafficFlowFiltersInterface,
    token: TokenEntities
  ): HttpRequestConfig {
    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/trafficflow/search`,
      data: filters,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    filters: TrafficFlowFiltersInterface
  ): Promise<HttpResponseInterface<TrafficFlowInterface>> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(filters, token)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
