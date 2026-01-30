import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostPointLaneGateway } from '../../domain/gateways/post-point-lane.gateway'
import type { PointLaneInterface } from '../../domain/interfaces/point-lane.interface'

export class PostPointLaneService implements PostPointLaneGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, pointId }: UrlParams,
    token: TokenEntities,
    laneId: PointLaneInterface
  ): HttpRequestConfig<{ lane_id: PointLaneInterface }> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/points/${pointId}/lanes`,
      data: { lane_id: laneId },
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(laneId: PointLaneInterface): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      laneId
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
