import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ProcessingUnitEnableAndDisableInterface } from '../../domain/interfaces/processing-unit-enable-and-disable.interface'
import type { PatchProcessingUnitStatusGateway } from '../../domain/gateways/patch-processing-unit-status.gateway'

export class PatchProcessingUnitStatusService implements PatchProcessingUnitStatusGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, processingUnitId }: UrlParams,
    token: TokenEntities,
    processingUnitEnabledAndDisabled: ProcessingUnitEnableAndDisableInterface
  ): HttpRequestConfig<ProcessingUnitEnableAndDisableInterface> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/ups/${processingUnitId}/status`,
      data: processingUnitEnabledAndDisabled,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    processingUnitEnabledAndDisabled: ProcessingUnitEnableAndDisableInterface
  ): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      processingUnitEnabledAndDisabled
    )
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
