import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import type { PostLaneGateway } from '../../domain/gateways/post-lane.gateway'

export class PostLaneService implements PostLaneGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  private normalizeLane(lane: LaneEntity): LaneEntity {
    const cfg =
      typeof lane.cfg === 'string'
        ? lane.cfg.trim() === ''
          ? {}
          : JSON.parse(lane.cfg)
        : lane.cfg

    return { ...lane, cfg }
  }

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    token: TokenEntities,
    lane: LaneEntity
  ): HttpRequestConfig<LaneEntity> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/ups/${processingUnitId}/lanes`,
      data: this.normalizeLane(lane),
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(lane: LaneEntity): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, token, lane)
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
