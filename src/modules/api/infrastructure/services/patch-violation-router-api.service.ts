import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ViolationEntity } from '@/modules/violations/domain/entities/violation.entity'

export class PatchViolationRouterApiService {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(violation: ViolationEntity): HttpRequestConfig {
    return {
      method: 'PATCH',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/violations/${this.params.violationId}`,
      data: violation
    }
  }

  async execute(
    violation: ViolationEntity
  ): Promise<HttpResponseInterface<ViolationEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(violation)
    return await this.httpRequest.execute<ViolationEntity>(settingsAuthHTTP)
  }
}
