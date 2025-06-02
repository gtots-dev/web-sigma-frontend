import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../../../users/domain/entities/user.entity'
import type { GetUserFilesRouterApiServiceInterface } from '../../domain/interfaces/get-user-files-router-api-service.interface'
import { HttpResponseUserFilesValidator } from '@/modules/users/domain/validators/http-response-user-files.validator'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'

export class GetUserFilesRouterApiService
  implements GetUserFilesRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(userId: UserEntity['id']): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/user/${userId}/files`
    }
  }

  async execute(userId: UserEntity['id']): Promise<UserFileInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(userId)
    const { success, data, status }: HttpResponse<UserFileInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserFilesValidator.validate(success, data, status)
    return data
  }
}
