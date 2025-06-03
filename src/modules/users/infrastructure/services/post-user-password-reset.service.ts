import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostUserPasswordResetServiceInterface } from '../../domain/interfaces/post-user-password-reset-service.interface'

import type { UserPasswordResetInterface } from '../../domain/interfaces/user-password-reset.interface'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import { HttpResponseUserPasswordResetValidator } from '../../domain/validators/http-response-user-password-reset.validator'

export class PostUserPasswordResetService
  implements PostUserPasswordResetServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly convertFormData: ConvertJsonToFormData
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userPasswordReset: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/users/password-resets`,
      data: userPasswordReset,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    userPasswordReset: UserPasswordResetInterface
  ): Promise<void> {
    const enrichedUserPasswordReset = {
      user_id: userPasswordReset.userId,
      days_passwd_reg_deadline: userPasswordReset.days_passwd_reg_deadline
    }
    const userPasswordResetFormDataConverted = this.convertFormData.execute({
      ...enrichedUserPasswordReset
    })
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      userPasswordResetFormDataConverted
    )
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserPasswordResetValidator.validate(success, status)
  }
}
