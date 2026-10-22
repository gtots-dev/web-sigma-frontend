import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteStatusLaneIgnoreRouterApiGateway } from '../../domain/gateways/delete-status-lane-ignore-router-api.gateway'

export class DeleteStatusLaneIgnoreRouterApiService
  implements DeleteStatusLaneIgnoreRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    const upId = this.params.upId ?? this.params.processingUnitId
    return {
      method: 'DELETE',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${upId}/lanes/${this.params.laneId}/status-list-ignore/${this.params.ignoreId}`
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
