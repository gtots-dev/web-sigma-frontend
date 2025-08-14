import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'
import type { PutUserStatusRouterApiServiceInterface } from '../../domain/interfaces/put-user-status-router-api-service.interface'

export class PutUserStatusRouterApiService
  implements PutUserStatusRouterApiServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData
  ) {}
  getHttpRequestConfig(
    userId: UserEntity['id'],
    userEnableAndDisable: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PUT',
      data: userEnableAndDisable,
      url: `api/user/${userId}/status`
    }
  }
  async execute(
    userEnableAndDisable: UserEnableAndDisableInterface
  ): Promise<void> {
    const userFormData = this.formData.execute({ ...userEnableAndDisable })
    const settingsAuthHTTP = this.getHttpRequestConfig(
      userEnableAndDisable.id,
      userFormData
    )
    const { success, status }: HttpResponse<null> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
