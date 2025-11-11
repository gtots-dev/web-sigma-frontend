import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { GetUserFilesGateway } from '../../domain/gateways/get-user-files.gateway'
import type { UserFileInterface } from '../../domain/interfaces/user-file.interface'
import { HttpResponseUserFilesValidator } from '../../domain/validators/http-response-user-files.validator'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class GetUserFilesService implements GetUserFilesGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, userId }: UrlParams,
    token: TokenEntities
  ): HttpRequestConfig<FormData> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/users/${userId}/files`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<UserFileInterface[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, token)
    const { success, data, status }: HttpResponse<UserFileInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserFilesValidator.validate(success, data, status)
    return data
  }
}
