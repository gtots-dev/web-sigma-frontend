import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseUserValidator } from '../../domain/validators/http-response-user.validator'
import type { PostUserServiceInterface } from '../../domain/interfaces/post-user-service.interface'
import type { UserEntity } from '../../domain/entities/user.entity'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PostUserService implements PostUserServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    user: UserEntity,
    operationSelectedId?: number
  ): HttpRequestConfig<FormData> {
    const converterJsonToFormData = FormDataConverterFactory.create()
    const userFormData = converterJsonToFormData.execute<
      Partial<UserEntity> & { operation_id?: number }
    >({
      ...user,
      operation_id: operationSelectedId
    })

    return {
      method: 'POST',
      url: `/users/`,
      data: userFormData,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    user: UserEntity,
    operationSelectedId?: number
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      user,
      operationSelectedId
    )
    const { success, data, status, message }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    console.table({ success, data, status, message })
    HttpResponseUserValidator.validate(success, data, status)
  }
}
