import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../../../users/domain/entities/user.entity'
import type { GetUserFileRouterApiServiceInterface } from '../../domain/interfaces/get-user-file-router-api-service.interface'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'

export class GetUserFileRouterApiService
  implements GetUserFileRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    userId: UserEntity['id'],
    fileId: UserFileInterface['id']
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/user/${userId}/files/${fileId}`
    }
  }

  async execute(
    userId: UserEntity['id'],
    fileId: UserFileInterface['id']
  ): Promise<Blob> {
    const settingsAuthHTTP = this.getHttpRequestConfig(userId, fileId)
    const { data }: HttpResponse<Blob> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
