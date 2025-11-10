import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { HttpResponseProcessingUnitValidator } from '../../domain/validators/http-response-processing-unit.validator'
import type { GetProcessingUnitsGateway } from '../../domain/gateways/get-processing-unit.gateway'

export class GetProcessingUnitsService
  implements GetProcessingUnitsGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    { operationId, contractId }: UrlParams
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/contracts/${contractId}/ups`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<ProcessingUnitEntity[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token, this.params)
    const { success, data, status }: HttpResponse<ProcessingUnitEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseProcessingUnitValidator.validate(success, status)
    return data
  }
}
