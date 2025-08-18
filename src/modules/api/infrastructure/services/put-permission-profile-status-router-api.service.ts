import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { PutPermissionProfileStatusRouterApiServiceInterface } from '../../domain/interfaces/put-permission-profile-status-router-api-service.interface'
import { HttpResponsePermissionProfileValidator } from '@/modules/permissions/domain/validators/http-response-permission-profile.validator'
import type { PermissionProfileEnableAndDisableInterface } from '@/modules/permissions/domain/interfaces/permission-profile-enable-and-disable.interface'

export class PutPermissionProfileStatusRouterApiService
  implements PutPermissionProfileStatusRouterApiServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData
  ) {}
  getHttpRequestConfig(
    permissionProfileId: PermissionProfileEntity['id'],
    permissionProfileEnableAndDisable: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PUT',
      data: permissionProfileEnableAndDisable,
      url: `api/permission/${permissionProfileId}/status`
    }
  }
  async execute(
    permissionProfileEnableAndDisable: PermissionProfileEnableAndDisableInterface
  ): Promise<void> {
    const userFormData = this.formData.execute({
      ...permissionProfileEnableAndDisable
    })
    const settingsAuthHTTP = this.getHttpRequestConfig(
      permissionProfileEnableAndDisable.id,
      userFormData
    )
    const { success, status }: HttpResponse<null> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponsePermissionProfileValidator.validate(success, status)
  }
}
