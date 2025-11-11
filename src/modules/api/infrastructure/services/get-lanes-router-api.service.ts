import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import type { GetLanesRouterApiGateway } from '../../domain/gateways/get-lanes-router-api.gateway'
import { HttpResponseLaneValidator } from '@/modules/lanes/domain/validators/http-response-lane.validator'

export class GetLanesRouterApiService
  implements GetLanesRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    contractId,
    processingUnitId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/contracts/${contractId}/processing-units/${processingUnitId}/lanes`
    }
  }

  async execute(): Promise<LaneEntity[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, data, status }: HttpResponse<LaneEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseLaneValidator.validate(success, status)
    return data
  }
}
