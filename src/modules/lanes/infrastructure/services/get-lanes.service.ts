import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import type { GetLanesGateway } from '../../domain/gateways/get-lanes.gateway'

export class GetLanesService implements GetLanesGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${this.params.processingUnitId}/lanes`,
      requiresAuth: true
    }
  }

  async execute(): Promise<HttpResponseInterface<LaneEntity[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
