import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../../../users/domain/entities/user.entity'
import type { GetUsersRouterApiGateway } from '../../domain/gateways/get-users-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUsersRouterApiService implements GetUsersRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId
  }: UrlParams): HttpRequestConfig<null, null> {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/users`
    }
  }

  async execute(): Promise<UserEntity[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<UserEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
