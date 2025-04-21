import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { UserInterface } from '../../domain/interfaces/user.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { PutUserServiceInterface } from '../../domain/interfaces/put-user-service.interface'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PutUserService implements PutUserServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    user: UserInterface
  ): HttpRequestConfig<FormData> {
    const converterJsonToFormData = FormDataConverterFactory.create()
    const userFormData =
      converterJsonToFormData.execute<Partial<UserInterface>>(user)
    return {
      method: 'PATCH',
      url: `/users/${user.id}`,
      data: userFormData,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    user: UserInterface
  ): Promise<UserInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, user)
    const { success, data, status }: HttpResponse<UserInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, data, status)
    return data
  }
}
