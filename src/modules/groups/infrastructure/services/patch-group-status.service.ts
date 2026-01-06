import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupEnableAndDisableInterface } from '../../domain/interfaces/group-enable-and-disable.interface'
import type { PatchGroupStatusGateway } from '../../domain/gateways/patch-group-status.gateway'
export class PatchGroupStatusService implements PatchGroupStatusGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    token: TokenEntities,
    groupEnabledAndDisabled: GroupEnableAndDisableInterface
  ): HttpRequestConfig<GroupEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${groupEnabledAndDisabled.id}/status`,
      data: groupEnabledAndDisabled,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    groupEnabledAndDisabled: GroupEnableAndDisableInterface
  ): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      groupEnabledAndDisabled
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
