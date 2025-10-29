import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { UserEntity } from '../../../users/domain/entities/user.entity'
import type { GetUsersRouterApiServiceInterface } from '../../domain/interfaces/get-users-router-api-service.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetUsersRouterApiService
  implements GetUsersRouterApiServiceInterface
{
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
    const { success, data, status }: HttpResponse<UserEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
    return data
  }
}
