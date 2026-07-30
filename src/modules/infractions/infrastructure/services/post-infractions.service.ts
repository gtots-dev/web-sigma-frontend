import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PostInfractionsGateway } from '../../domain/gateways/post-infractions.gateway'
import type { PostInfractionsPayload } from '../../domain/interfaces/post-infractions-payload.interface'
import type { Infraction } from '../../domain/interfaces/infraction.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostInfractionsService implements PostInfractionsGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  private getHttpRequestConfig(
    payload?: PostInfractionsPayload
  ): HttpRequestConfig<PostInfractionsPayload> {
    return {
      method: 'POST',
      url: `operations/${this.params.operationId}/contracts/${this.params.contractId}/trafficflows/search-captures`,
      data: {
        filters: payload?.filters ?? {},
        pagination: payload?.pagination ?? { page: 1, per_page: 50 }
      },
      requiresAuth: true
    }
  }

  async execute(payload?: PostInfractionsPayload): Promise<Infraction[]> {
    const config = this.getHttpRequestConfig(payload)
    const { data }: HttpResponseInterface<Infraction[]> =
      await this.executeRequest.execute(config)
    return data
  }
}
