import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetInfractionsRouterApiGateway } from '../../domain/gateways/get-infractions-router-api.gateway'
import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'

export class GetInfractionsRouterApiService implements GetInfractionsRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/contracts/${contractId}/infractions`
    }
  }

  async execute(): Promise<Infraction[]> {
    const config = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<Infraction[]> =
      await this.executeRequest.execute(config)
    return data
  }
}
