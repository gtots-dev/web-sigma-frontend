import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetProcessingUnitStatusListGateway } from '../../domain/gateways/get-processing-unit-status-list.gateway'
import type { ProcessingUnitStatusInterface } from '../../domain/interfaces/processing-unit-status-interface'

export class GetProcessingUnitStatusListService implements GetProcessingUnitStatusListGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/status-list`,
      requiresAuth: true
    }
  }

  async execute(): Promise<
    HttpResponseInterface<ProcessingUnitStatusInterface[]>
  > {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
