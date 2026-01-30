import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteGroupSubgroupRouterApiGateway } from '../../domain/gateways/delete-group-subgroup-router-api.gateway'

export class DeleteGroupSubgroupRouterApiService implements DeleteGroupSubgroupRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    contractId,
    groupId,
    subgroupId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'DELETE',
      url: `api/operations/${operationId}/contracts/${contractId}/groups/${groupId}/subgroups/${subgroupId}`
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    await this.executeRequest.execute<null>(settingsAuthHTTP)
  }
}
