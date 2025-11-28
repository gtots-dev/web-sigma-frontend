import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponsePointValidator } from '@/modules/points/domain/validators/http-response-point.validator'
import type { DeletePointLaneRouterApiGateway } from '../../domain/gateways/delete-point-lane-router-api.gateway'

export class DeletePointLaneRouterApiService
  implements DeletePointLaneRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    contractId,
    pointId,
    laneId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'DELETE',
      url: `api/operations/${operationId}/contracts/${contractId}/points/${pointId}/lanes/${laneId}`
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponsePointValidator.validate(success, status)
  }
}
