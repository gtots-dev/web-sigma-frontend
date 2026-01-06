import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import type { GetLanesRouterApiGateway } from '../../domain/gateways/get-lanes-router-api.gateway'

export class GetLanesRouterApiService implements GetLanesRouterApiGateway {
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
    const { data }: HttpResponseInterface<LaneEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
