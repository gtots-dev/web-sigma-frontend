import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchUserStatusRouterApiGateway } from '../../domain/gateways/patch-user-status-router-api.gateway'

export class PatchUserStatusRouterApiService
  implements PatchUserStatusRouterApiGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId }: UrlParams,
    userEnableAndDisable: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PATCH',
      data: userEnableAndDisable,
      url: `api/operations/${operationId}/users/${userEnableAndDisable.get('id')}/status`
    }
  }
  async execute(
    userEnableAndDisable: UserEnableAndDisableInterface
  ): Promise<void> {
    const userFormData = this.formData.execute({ ...userEnableAndDisable })
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      userFormData
    )
    const { success, status }: HttpResponse<null> =
      await this.httpRequest.execute(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
