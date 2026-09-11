import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ViolationInterface } from '@/modules/violations/domain/interfaces/violation.interface'

export class GetViolationsRouterApiService {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/violations`
    }
  }

  async execute(): Promise<HttpResponseInterface<ViolationInterface[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.httpRequest.execute<ViolationInterface[]>(
      settingsAuthHTTP
    )
  }
}
