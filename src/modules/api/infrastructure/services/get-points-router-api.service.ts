import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetPointsRouterApiGateway } from '../../domain/gateways/get-points-router-api.gateway'
import { HttpResponsePointValidator } from '@/modules/points/domain/validators/http-response-point.validator'
import type { PointWithGroupInterface } from '@/modules/points/domain/interfaces/point-with-group.interface'

export class GetPointsRouterApiService implements GetPointsRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    contractId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/contracts/${contractId}/points`
    }
  }

  async execute(): Promise<PointWithGroupInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, data, status }: HttpResponse<PointWithGroupInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponsePointValidator.validate(success, status)
    return data
  }
}
