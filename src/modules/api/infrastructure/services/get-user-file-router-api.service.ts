import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetUserFileRouterApiGateway } from '../../domain/gateways/get-user-file-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UrlFileInterface } from '@/modules/users/domain/interfaces/url-file.interface'

export class GetUserFileRouterApiService
  implements GetUserFileRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    userId,
    fileId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/users/${userId}/files/${fileId}`
    }
  }

  async execute(): Promise<UrlFileInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<UrlFileInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
