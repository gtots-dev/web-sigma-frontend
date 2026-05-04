import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteGroupPointGateway } from '../../domain/gateways/delete-group-point.gateway'

export class DeleteGroupPointService implements DeleteGroupPointGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, groupId, pointId }: UrlParams
  ): HttpRequestConfig {
    return {
      method: 'DELETE',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${groupId}/points/${pointId}`,
      requiresAuth: true
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
