import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteGroupLaneGateway } from '../../domain/gateways/delete-group-lane.gateway'

export class DeleteGroupLaneService implements DeleteGroupLaneGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, groupId, laneId }: UrlParams
  ): HttpRequestConfig {
    return {
      method: 'DELETE',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${groupId}/lanes/${laneId}`,
      requiresAuth: true
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
