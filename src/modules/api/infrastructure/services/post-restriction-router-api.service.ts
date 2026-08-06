import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'

export class PostRestrictionRouterApiService {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(restriction: RestrictionEntity): HttpRequestConfig {
    return {
      method: 'POST',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/restrictions`,
      data: restriction
    }
  }

  async execute(
    restriction: RestrictionEntity
  ): Promise<HttpResponseInterface<RestrictionEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(restriction)
    return await this.httpRequest.execute<RestrictionEntity>(settingsAuthHTTP)
  }
}
