import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PatchUserRouterApiGateway } from '../../domain/gateways/patch-user-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PatchUserRouterApiService implements PatchUserRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(user: UserEntity): HttpRequestConfig<UserEntity> {
    return {
      method: 'PATCH',
      data: user,
      url: `api/operations/${this.params.operationId}/users/${this.params.userId}`
    }
  }
  async execute(user: UserEntity): Promise<HttpResponseInterface<UserEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(user)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
