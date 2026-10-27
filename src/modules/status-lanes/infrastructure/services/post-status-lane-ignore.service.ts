import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostStatusLaneIgnoreGateway } from '../../domain/gateways/post-status-lane-ignore.gateway'
import type {
  PostStatusLaneIgnoreInterface,
  StatusLaneIgnoreInterface
} from '../../domain/interfaces/status-lane-ignore.interface'

export class PostStatusLaneIgnoreService implements PostStatusLaneIgnoreGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    data: PostStatusLaneIgnoreInterface
  ): HttpRequestConfig<PostStatusLaneIgnoreInterface> {
    const upId = this.params.upId ?? this.params.processingUnitId
    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/ups/${upId}/lanes/${this.params.laneId}/status-list-ignore`,
      data,
      requiresAuth: true
    }
  }

  async execute(
    data: PostStatusLaneIgnoreInterface
  ): Promise<HttpResponseInterface<StatusLaneIgnoreInterface>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(data)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
