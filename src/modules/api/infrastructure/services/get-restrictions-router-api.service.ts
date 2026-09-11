import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'

export class GetRestrictionsRouterApiService {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/restrictions`
    }
  }

  async execute(): Promise<HttpResponseInterface<RestrictionEntity[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.httpRequest.execute<RestrictionEntity[]>(settingsAuthHTTP)
  }
}
