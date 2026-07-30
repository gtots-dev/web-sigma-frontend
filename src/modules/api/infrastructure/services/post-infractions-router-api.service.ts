import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PostInfractionsRouterApiGateway } from '../../domain/gateways/post-infractions-router-api.gateway'
import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PostInfractionsPayload } from '@/modules/infractions/domain/interfaces/post-infractions-payload.interface'

export class PostInfractionsRouterApiService implements PostInfractionsRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  private getHttpRequestConfig(
    payload?: PostInfractionsPayload
  ): HttpRequestConfig<PostInfractionsPayload> {
    return {
      method: 'POST',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/trafficflows/search-captures`,
      data: {
        filters: payload?.filters ?? {},
        pagination: payload?.pagination ?? { page: 1, per_page: 50 }
      }
    }
  }

  async execute(payload?: PostInfractionsPayload): Promise<Infraction[]> {
    const config = this.getHttpRequestConfig(payload)
    const { data }: HttpResponseInterface<Infraction[]> =
      await this.executeRequest.execute(config)
    return data
  }
}
