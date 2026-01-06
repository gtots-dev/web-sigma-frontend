import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostFeatureGateway } from '../../domain/gateways/post-feature.gateway'
import type { FeaturesInterface } from '../../domain/interfaces/features.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostFeatureService implements PostFeatureGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, permissionProfileId }: UrlParams,
    token: TokenEntities,
    features: FeaturesInterface['id'][]
  ): HttpRequestConfig<{ feature_id: FeaturesInterface['id'][] }> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/perm-profiles/${permissionProfileId}/features`,
      data: {
        feature_id: features
      },
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(features: FeaturesInterface['id'][]): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      features
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
