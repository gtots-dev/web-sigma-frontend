import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PutPasswordResetGateway } from '../../domain/gateways/put-password-reset-service.gateway'
import type { PasswordResetInterface } from '../../domain/interfaces/password-reset.interface'

export class PutPasswordResetService implements PutPasswordResetGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig({
    token,
    newPassword
  }: PasswordResetInterface): HttpRequestConfig<{
    token: string
    new_password: string
  }> {
    return {
      method: 'PUT',
      url: `/users/passwords`,
      data: {
        token: token,
        new_password: newPassword
      }
    }
  }

  async execute(passwordResetWithToken: PasswordResetInterface): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(passwordResetWithToken)
    await this.executeRequest.execute(settingsAuthHTTP)
  }
}
