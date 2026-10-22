import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetStatusLaneIgnoreGateway } from '../../domain/gateways/get-status-lane-ignore.gateway'
import type { StatusLaneIgnoreInterface } from '../../domain/interfaces/status-lane-ignore.interface'

export class GetStatusLaneIgnoreService implements GetStatusLaneIgnoreGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig<null> {
    const upId = this.params.upId ?? this.params.processingUnitId
    return {
      method: 'GET',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${upId}/lanes/${this.params.laneId}/status-list-ignore`,
      requiresAuth: true
    }
  }

  async execute(): Promise<
    HttpResponseInterface<StatusLaneIgnoreInterface[]>
  > {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
