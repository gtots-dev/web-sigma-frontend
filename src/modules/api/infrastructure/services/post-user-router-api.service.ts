import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostUserRouterApiGateway } from '../../domain/gateways/post-user-router-api.gateway'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PostUserRouterApiService implements PostUserRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(userFormData: FormData): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      data: userFormData,
      url: `api/operations/${this.params.operationId}/users`
    }
  }
  async execute(
    userWithFiles: UserWithFiles
  ): Promise<HttpResponseInterface<UserEntity>> {
    const userFormData = this.formData.execute({ ...userWithFiles })
    const settingsAuthHTTP = this.getHttpRequestConfig(userFormData)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
