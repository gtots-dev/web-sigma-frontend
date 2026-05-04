import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PatchUserGateway } from '../../domain/gateways/patch-user.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../../domain/entities/user.entity'

export class PatchUserService implements PatchUserGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    user: UserEntity
  ): HttpRequestConfig<UserEntity> {
    return {
      method: 'PATCH',
      url: `/operations/${this.params.operationId}/users/${this.params.userId}`,
      data: user,
      requiresAuth: true
    }
  }

  async execute(user: UserEntity): Promise<HttpResponseInterface<UserEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(user)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
