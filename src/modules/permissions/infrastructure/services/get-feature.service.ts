import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'
import type { GetFeatureGateway } from '../../domain/gateways/get-feature.gateway'

export class GetFeatureService implements GetFeatureGateway {
  constructor(private readonly httpRequest: ExecuteRequest) {}

  getHttpRequestConfig(token: TokenEntities): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/features`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(token: TokenEntities): Promise<FeaturesInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token)
    const { data }: HttpResponseInterface<FeaturesInterface[]> =
      await this.httpRequest.execute(settingsAuthHTTP)
    return data
  }
}
