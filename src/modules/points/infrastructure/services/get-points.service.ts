import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import { HttpResponsePointValidator } from '../../domain/validators/http-response-point.validator'
import type { GetPointsGateway } from '../../domain/gateways/get-points.gateway'
import type { PointWithGroupInterface } from '../../domain/interfaces/point-with-group.interface'

export class GetPointsService implements GetPointsGateway {
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
      url: `/operations/${operationId}/contracts/${contractId}/points`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<PointWithGroupInterface[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token, this.params)
    const { success, data, status }: HttpResponse<PointWithGroupInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponsePointValidator.validate(success, status)
    return data
  }
}
