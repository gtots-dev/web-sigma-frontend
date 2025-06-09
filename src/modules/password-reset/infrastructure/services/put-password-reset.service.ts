import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import { HttpResponsePasswordResetValidator } from '../../domain/validators/http-response-password-reset.validator'
import type { PutPasswordResetServiceInterface } from '../../domain/interfaces/put-password-reset-service.interface'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { PasswordResetInterface } from '../../domain/interfaces/password-reset.interface'

export class PutPasswordResetService
  implements PutPasswordResetServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly convertFormData: ConvertJsonToFormData
  ) {}

  getHttpRequestConfig(
    passwordResetWithToken: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PUT',
      url: `/users/password-resets`,
      data: passwordResetWithToken
    }
  }

  async execute({ token, newPassword }: PasswordResetInterface): Promise<void> {
    const enrichedPasswordReset = {
      token: token,
      new_password: newPassword
    }
    const passwordResetWithTokenConverted = this.convertFormData.execute(
      enrichedPasswordReset
    )
    const settingsAuthHTTP = this.getHttpRequestConfig(
      passwordResetWithTokenConverted
    )
    const { success, status } =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponsePasswordResetValidator.validate(success, status)
  }
}
