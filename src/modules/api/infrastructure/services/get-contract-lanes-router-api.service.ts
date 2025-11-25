import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseLaneValidator } from '@/modules/lanes/domain/validators/http-response-lane.validator'
import type { LaneWithPointAndGroupInterface } from '@/modules/lanes/domain/interfaces/lane-with-point-and-group.interface'
import type { GetContractLanesRouterApiGateway } from '../../domain/gateways/get-contract-lanes-router-api.gateway'

export class GetContractLanesRouterApiService
  implements GetContractLanesRouterApiGateway
{
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
      url: `api/operations/${operationId}/contracts/${contractId}/lanes`
    }
  }

  async execute(): Promise<LaneWithPointAndGroupInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const {
      success,
      data,
      status
    }: HttpResponse<LaneWithPointAndGroupInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseLaneValidator.validate(success, status)
    return data
  }
}
