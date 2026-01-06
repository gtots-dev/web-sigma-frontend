import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PutPasswordResetRouterApiGateway } from '../../domain/gateways/put-password-reset-router-api.interface'
import type { PasswordResetInterface } from '@/modules/password-reset/domain/interfaces/password-reset.interface'

export class PutPasswordResetRouterApiService implements PutPasswordResetRouterApiGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig({
    token,
    newPassword
  }: PasswordResetInterface): HttpRequestConfig {
    return {
      method: 'PUT',
      data: { token, newPassword },
      url: 'api/password-reset'
    }
  }

  async execute({ token, newPassword }: PasswordResetInterface): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig({ token, newPassword })
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
