import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostUserPasswordResetServiceInterface } from '../../domain/interfaces/post-user-password-reset-service.interface'
import type { UserPasswordResetInterface } from '../../domain/interfaces/user-password-reset.interface'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import { HttpResponseUserPasswordResetValidator } from '../../domain/validators/http-response-user-password-reset.validator'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostUserPasswordResetService
  implements PostUserPasswordResetServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly convertFormData: ConvertJsonToFormData,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId }: UrlParams,
    token: TokenEntities,
    userPasswordResetFormData: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/operations/${operationId}/users/${userId}/passwords`,
      data: userPasswordResetFormData,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute({
    days_passwd_reg_deadline
  }: UserPasswordResetInterface): Promise<void> {
    const token = await this.auth.getToken()
    const userPasswordResetFormDataConverted = this.convertFormData.execute({
      days_passwd_reg_deadline
    })
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      userPasswordResetFormDataConverted
    )
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserPasswordResetValidator.validate(success, status)
  }
}
