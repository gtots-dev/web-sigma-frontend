import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { RestrictionEntity } from '../../domain/entities/restriction.entity'

export class PatchRestrictionService {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(restriction: RestrictionEntity): HttpRequestConfig {
    return {
      method: 'PATCH',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/trafficflows/restrictions/${this.params.restrictionId}`,
      data: restriction,
      requiresAuth: true
    }
  }

  async execute(
    restriction: RestrictionEntity
  ): Promise<HttpResponseInterface<RestrictionEntity>> {
    const config = this.getHttpRequestConfig(restriction)
    return await this.executeRequest.execute(config)
  }
}
