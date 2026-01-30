import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetUserFilesRouterApiGateway } from '../../domain/gateways/get-user-files-router-api.gateway'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUserFilesRouterApiService implements GetUserFilesRouterApiGateway {
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
    const { data }: HttpResponseInterface<UserFileInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
