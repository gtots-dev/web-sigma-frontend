import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import type { PatchProcessingUnitServiceInterface } from '../../domain/interfaces/patch-processing-unit-service.interface'
import { HttpResponseProcessingUnitValidator } from '../../domain/validators/http-response-processing-unit.validator'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchProcessingUnitService
  implements PatchProcessingUnitServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  private normalizeProcessingUnit(
    processingUnit: ProcessingUnitEntity
  ): ProcessingUnitEntity {
    const cfg =
      typeof processingUnit.cfg === 'string'
        ? processingUnit.cfg.trim() === ''
          ? {}
          : JSON.parse(processingUnit.cfg)
        : processingUnit.cfg

    return { ...processingUnit, cfg }
  }

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    token: TokenEntities,
    processingUnit: ProcessingUnitEntity
  ): HttpRequestConfig<ProcessingUnitEntity> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/ups`,
      data: this.normalizeProcessingUnit(processingUnit),
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(processingUnit: ProcessingUnitEntity): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      processingUnit
    )
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseProcessingUnitValidator.validate(success, status)
  }
}
