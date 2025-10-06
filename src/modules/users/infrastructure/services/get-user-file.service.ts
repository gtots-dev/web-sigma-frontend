import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { GetUserFileServiceInterface } from '../../domain/interfaces/get-user-file-service.interface'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { UserFileInterface } from '../../domain/interfaces/user-file.interface'

export class GetUserFileService implements GetUserFileServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    userId: UserEntity['id'],
    fileId: UserFileInterface['id']
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/users/${userId}/files/${fileId}`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    userId: UserEntity['id'],
    fileId: UserFileInterface['id']
  ): Promise<File> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, userId, fileId)
    const { data }: HttpResponse<File> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
