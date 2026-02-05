import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostUserFilesRouterApiGateway } from '../../domain/gateways/post-user-files-router-api.gateway'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserFilesInterface } from '@/modules/users/domain/interfaces/user-files.interface'

export class PostUserFilesRouterApiService implements PostUserFilesRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(files: FormData): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      data: files,
      url: `api/operations/${this.params.operationId}/users/${this.params.userId}/files`
    }
  }
  async execute(
    files: UserFilesInterface
  ): Promise<HttpResponseInterface<void>> {
    const userFormData = this.formData.execute({ ...files })
    const settingsAuthHTTP = this.getHttpRequestConfig(userFormData)
    return await this.httpRequest.execute<void>(settingsAuthHTTP)
  }
}
