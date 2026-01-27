import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'
import type { GetFeatureGateway } from '../../domain/gateways/get-feature.gateway'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

export class GetFeatureService implements GetFeatureGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider
  ) {}

  getHttpRequestConfig(token: TokenEntities): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/features`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<
    HttpResponseInterface<FeaturesInterface[]> | HttpResponseErrorInterface
  > {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
