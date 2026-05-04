import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostTwoFactorGateway } from '../../domain/gateways/post-two-factor.gateway'

export class PostTwoFactorService implements PostTwoFactorGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'POST',
      url: '/request-2fa',
      requiresAuth: true
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
