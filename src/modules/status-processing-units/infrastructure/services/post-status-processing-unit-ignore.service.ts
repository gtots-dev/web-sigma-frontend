import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostStatusProcessingUnitIgnoreGateway } from '../../domain/gateways/post-status-processing-unit-ignore.gateway'
import type {
  PostStatusProcessingUnitIgnoreInterface,
  StatusProcessingUnitIgnoreInterface
} from '../../domain/interfaces/status-processing-unit-ignore.interface'

export class PostStatusProcessingUnitIgnoreService implements PostStatusProcessingUnitIgnoreGateway {
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
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${upId}/status-list-ignore`,
      data,
      requiresAuth: true
    }
  }

  async execute(
    data: PostStatusProcessingUnitIgnoreInterface
  ): Promise<HttpResponseInterface<StatusProcessingUnitIgnoreInterface>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(data)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
