import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { GetContractLanesGateway } from '../../domain/gateways/get-contract-lanes.gateway'
import type { LaneWithPointAndGroupInterface } from '../../domain/interfaces/lane-with-point-and-group.interface'

export class GetContractLanesService implements GetContractLanesGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    { operationId, contractId }: UrlParams
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/contracts/${contractId}/lanes`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<LaneWithPointAndGroupInterface[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token, this.params)
    const { data }: HttpResponseInterface<LaneWithPointAndGroupInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
