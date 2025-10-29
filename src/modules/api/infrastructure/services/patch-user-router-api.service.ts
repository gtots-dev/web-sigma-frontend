import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { PatchUserRouterApiServiceInterface } from '../../domain/interfaces/patch-user-router-api-service.interface'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchUserRouterApiService
  implements PatchUserRouterApiServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId }: UrlParams,
    userWithFiles: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PATCH',
      data: userWithFiles,
      url: `api/operations/${operationId}/users/${userWithFiles.get('id')}`
    }
  }
  async execute(userWithFiles: UserWithFiles): Promise<void> {
    const userFormData = this.formData.execute(userWithFiles)
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      userFormData
    )
    const { success, status }: HttpResponse<null> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
