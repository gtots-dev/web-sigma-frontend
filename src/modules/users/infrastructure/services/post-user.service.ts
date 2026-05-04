import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostUserGateway } from '../../domain/gateways/post-user.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../../domain/entities/user.entity'

export class PostUserService implements PostUserGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    user: UserEntity
  ): HttpRequestConfig<UserEntity> {
    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/users`,
      data: user,
      requiresAuth: true
    }
  }

  async execute(user: UserEntity): Promise<HttpResponseInterface<UserEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(user)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
