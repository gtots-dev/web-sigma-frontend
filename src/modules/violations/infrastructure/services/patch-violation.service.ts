import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ViolationEntity } from '../../domain/entities/violation.entity'

export class PatchViolationService {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(violation: ViolationEntity): HttpRequestConfig {
    return {
      method: 'PATCH',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/trafficflows/violation-colors/${this.params.violationId}`,
      data: violation,
      requiresAuth: true
    }
  }

  async execute(
    violation: ViolationEntity
  ): Promise<HttpResponseInterface<ViolationEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(violation)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
