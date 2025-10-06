import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import type { GetPermissionProfilesRouterApiServiceInterface } from '../../domain/interfaces/get-permission-profile-router-api-service.interface'

export class GetPermissionProfilesRouterApiService
  implements GetPermissionProfilesRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig<null, null> {
    return {
      method: 'GET',
      url: 'api/permission'
    }
  }

  async execute(): Promise<PermissionProfileInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const {
      success,
      data,
      status
    }: HttpResponse<PermissionProfileInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
    return data
  }
}
