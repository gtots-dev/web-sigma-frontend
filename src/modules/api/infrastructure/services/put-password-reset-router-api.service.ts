import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PutPasswordResetRouterApiServiceInterface } from '../../domain/interfaces/put-password-reset-router-api.interface'
import { HttpResponsePasswordResetValidator } from '@/modules/password-reset/domain/validators/http-response-password-reset.validator'
import type { PasswordResetInterface } from '@/modules/password-reset/domain/interfaces/password-reset.interface'

export class PutPasswordResetRouterApiService
  implements PutPasswordResetRouterApiServiceInterface
{
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
    const { success, status } =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponsePasswordResetValidator.validate(success, status)
  }
}
