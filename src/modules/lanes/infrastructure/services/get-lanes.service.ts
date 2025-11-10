import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { HttpResponseLaneValidator } from '../../domain/validators/http-response-lane.validator'
import type { GetLanesGateway } from '../../domain/gateways/get-lanes.gateway'

export class GetLanesService implements GetLanesGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    { operationId, contractId, processingUnitId }: UrlParams
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/contracts/${contractId}/ups/${processingUnitId}/lanes`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<LaneEntity[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token, this.params)
    const { success, data, status }: HttpResponse<LaneEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseLaneValidator.validate(success, status)
    return data
  }
}
