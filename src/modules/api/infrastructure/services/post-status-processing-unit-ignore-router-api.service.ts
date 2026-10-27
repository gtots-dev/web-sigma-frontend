import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostStatusProcessingUnitIgnoreRouterApiGateway } from '../../domain/gateways/post-status-processing-unit-ignore-router-api.gateway'
import type {
  PostStatusProcessingUnitIgnoreInterface,
  StatusProcessingUnitIgnoreInterface
} from '@/modules/status-processing-units/domain/interfaces/status-processing-unit-ignore.interface'

export class PostStatusProcessingUnitIgnoreRouterApiService implements PostStatusProcessingUnitIgnoreRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    data: PostStatusProcessingUnitIgnoreInterface
  ): HttpRequestConfig<PostStatusProcessingUnitIgnoreInterface> {
    const upId = this.params.upId ?? this.params.processingUnitId
    return {
      method: 'POST',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${upId}/status-list-ignore`,
      data
    }
  }

  async execute(
    data: PostStatusProcessingUnitIgnoreInterface
  ): Promise<HttpResponseInterface<StatusProcessingUnitIgnoreInterface>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(data)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
