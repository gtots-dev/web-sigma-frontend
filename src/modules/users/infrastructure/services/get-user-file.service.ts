import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { GetUserFileGateway } from '../../domain/gateways/get-user-file.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class GetUserFileService implements GetUserFileGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId, fileId }: UrlParams,
    token: TokenEntities
  ): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/operations/${operationId}/users/${userId}/files/${fileId}`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<File> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, token)
    const { data }: HttpResponseInterface<File> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
