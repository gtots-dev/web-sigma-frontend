import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { GetUserFilesServiceInterface } from '../../domain/interfaces/get-user-files-service.interface'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { UserFileInterface } from '../../domain/interfaces/user-file.interface'
import { HttpResponseUserFilesValidator } from '../../domain/validators/http-response-user-files.validator'

export class GetUserFilesService implements GetUserFilesServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userId: UserEntity['id']
  ): HttpRequestConfig<FormData> {
    return {
      method: 'GET',
      url: `/users/${userId}/files/`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    userId: UserEntity['id']
  ): Promise<UserFileInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, userId)
    const { success, data, status }: HttpResponse<UserFileInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserFilesValidator.validate(success, data, status)
    return data
  }
}
