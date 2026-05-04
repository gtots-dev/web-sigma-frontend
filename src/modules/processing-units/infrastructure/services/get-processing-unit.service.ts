import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import type { GetProcessingUnitsGateway } from '../../domain/gateways/get-processing-unit.gateway'

export class GetProcessingUnitsService implements GetProcessingUnitsGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups`,
      requiresAuth: true
    }
  }

  async execute(): Promise<HttpResponseInterface<ProcessingUnitEntity[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
