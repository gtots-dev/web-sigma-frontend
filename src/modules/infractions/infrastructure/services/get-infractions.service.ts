import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetInfractionsGateway } from '../../domain/gateways/get-infractions.gateway'
import type { Infraction } from '../../domain/interfaces/infractions-websocket.interface'

export class GetInfractionsService implements GetInfractionsGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/contracts/${contractId}/infractions`,
      requiresAuth: true
    }
  }

  async execute(): Promise<Infraction[]> {
    const config = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<Infraction[]> =
      await this.executeRequest.execute(config)
    return data
  }
}
