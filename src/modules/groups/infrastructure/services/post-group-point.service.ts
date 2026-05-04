import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostGroupPointGateway } from '../../domain/gateways/post-group-point.gateway'
import type { GroupPointInterface } from '../../domain/interfaces/group-point.interface'

export class PostGroupPointService implements PostGroupPointGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, groupId }: UrlParams,
    pointId: GroupPointInterface
  ): HttpRequestConfig<{ point_id: GroupPointInterface }> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${groupId}/points`,
      data: { point_id: pointId },
      requiresAuth: true
    }
  }

  async execute(pointId: GroupPointInterface): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, pointId
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
