import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteStatusLaneIgnoreGateway } from '../../domain/gateways/delete-status-lane-ignore.gateway'

export class DeleteStatusLaneIgnoreService
  implements DeleteStatusLaneIgnoreGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig<null> {
    const upId = this.params.upId ?? this.params.processingUnitId
    return {
      method: 'DELETE',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${upId}/lanes/${this.params.laneId}/status-list-ignore/${this.params.ignoreId}`,
      requiresAuth: true
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
