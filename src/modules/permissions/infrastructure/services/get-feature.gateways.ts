import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'
import type { GetFeatureGateway } from '../../domain/gateways/get-feature.gateway'
import { HttpFeatureValidator } from '../../domain/validators/http-response-feature.validator'

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
    const { success, data, status }: HttpResponse<FeaturesInterface[]> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpFeatureValidator.validate(success, status)
    return data
  }
}
