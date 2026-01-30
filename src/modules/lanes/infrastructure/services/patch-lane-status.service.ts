import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEnableAndDisableInterface } from '../../domain/interfaces/lane-enable-and-disable.interface'
import type { PatchLaneStatusGateway } from '../../domain/gateways/patch-lane-status.gateway'
export class PatchLaneStatusService implements PatchLaneStatusGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    token: TokenEntities,
    laneEnabledAndDisabled: LaneEnableAndDisableInterface
  ): HttpRequestConfig<LaneEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/ups/${processingUnitId}/lanes/${laneEnabledAndDisabled.id}/status`,
      data: laneEnabledAndDisabled,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    laneEnabledAndDisabled: LaneEnableAndDisableInterface
  ): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      laneEnabledAndDisabled
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
