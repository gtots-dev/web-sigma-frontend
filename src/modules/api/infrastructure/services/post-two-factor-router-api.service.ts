import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostTwoFactorRouterApiGateway } from '../../domain/gateways/post-two-factor-router-api.gateway'

export class PostTwoFactorRouterApiService implements PostTwoFactorRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
  ) {}
  getHttpRequestConfig(
  ): HttpRequestConfig {
    return {
      method: 'POST',
      url: `api/2fa`
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
