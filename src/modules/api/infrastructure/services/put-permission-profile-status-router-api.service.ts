import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PutPermissionProfileStatusRouterApiServiceInterface } from '../../domain/interfaces/put-permission-profile-status-router-api-service.interface'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { PermissionProfileEnableAndDisableInterface } from '@/modules/permissions/domain/interfaces/permission-profile-enable-and-disable.interface'

export class PutPermissionProfileStatusRouterApiService
  implements PutPermissionProfileStatusRouterApiServiceInterface
{
  constructor(private readonly httpRequest: ExecuteRequest) {}
  getHttpRequestConfig(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): HttpRequestConfig<PermissionProfileEnableAndDisableInterface> {
    return {
      method: 'PUT',
      data: permissionProfileEnableAndDisable,
      url: `api/permission/${permissionProfileEnableAndDisable.id}/status`
    }
  }
  async execute(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      permissionProfileEnableAndDisable
    )
    const { success, status }: HttpResponse<null> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
