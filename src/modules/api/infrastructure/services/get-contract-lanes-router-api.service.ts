import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
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

  async execute(): Promise<
    HttpResponseInterface<LaneWithPointAndGroupInterface[]>
  > {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
