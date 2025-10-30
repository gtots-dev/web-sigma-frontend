import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetUserFilesRouterApiServiceInterface } from '../../domain/interfaces/get-user-files-router-api-service.interface'
import { HttpResponseUserFilesValidator } from '@/modules/users/domain/validators/http-response-user-files.validator'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserFilesRouterApiService
  implements GetUserFilesRouterApiServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({ operationId, userId }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/users/${userId}/files`
    }
  }

  async execute(): Promise<UserFileInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, data, status }: HttpResponse<UserFileInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserFilesValidator.validate(success, data, status)
    return data
  }
}
