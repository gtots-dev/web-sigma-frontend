import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostUserFilesGateway } from '../../domain/gateways/post-user-files.gateway.ts'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PostUserFilesService implements PostUserFilesGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    files: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/users/${this.params.userId}/files`,
      data: files,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(files: FormData): Promise<HttpResponseInterface<void>> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token, files)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
