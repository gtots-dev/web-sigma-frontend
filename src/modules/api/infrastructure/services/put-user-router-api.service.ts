import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { PutUserRouterApiServiceInterface } from '../../domain/interfaces/put-user-router-api-service.interface'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'

export class PutUserRouterApiService
  implements PutUserRouterApiServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData
  ) {}
  getHttpRequestConfig(
    userId: UserEntity['id'],
    userWithFiles: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PUT',
      data: userWithFiles,
      url: `api/user/${userId}`
    }
  }
  async execute(userWithFiles: UserWithFiles): Promise<void> {
    const userFormData = this.formData.execute(userWithFiles)
    const settingsAuthHTTP = this.getHttpRequestConfig(
      userWithFiles.id,
      userFormData
    )
    const { success, status }: HttpResponse<null> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
