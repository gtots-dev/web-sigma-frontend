import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseProcessingUnitValidator } from '../../domain/validators/http-response-processing-unit.validator'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ProcessingUnitEnableAndDisableInterface } from '../../domain/interfaces/processing-unit-enable-and-disable.interface'
import type { PatchProcessingUnitStatusServiceInterface } from '../../domain/interfaces/patch-processing-unit-status-service.interface'

export class PatchProcessingUnitStatusService
  implements PatchProcessingUnitStatusServiceInterface
{
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
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseProcessingUnitValidator.validate(success, status)
  }
}
