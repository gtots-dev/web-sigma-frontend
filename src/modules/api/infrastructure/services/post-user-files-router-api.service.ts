import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostUserFilesRouterApiGateway } from '../../domain/gateways/post-user-files-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserFilesInterface } from '@/modules/users/domain/interfaces/user-files.interface'

export class PostUserFilesRouterApiService implements PostUserFilesRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
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
    const formData = new FormData()

    files.files.forEach((file) =>
      formData.append(`file:${file.name}`, file, file.name)
    )

    const config = this.getHttpRequestConfig(formData)
    return await this.httpRequest.execute<void>(config)
  }
}
