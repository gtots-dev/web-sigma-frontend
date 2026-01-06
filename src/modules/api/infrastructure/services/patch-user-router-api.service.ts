import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PatchUserRouterApiGateway } from '../../domain/gateways/patch-user-router-api.gateway'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchUserRouterApiService implements PatchUserRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId }: UrlParams,
    userWithFiles: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'PATCH',
      data: userWithFiles,
      url: `api/operations/${operationId}/users/${userWithFiles.get('id')}`
    }
  }
  async execute(userWithFiles: UserWithFiles): Promise<void> {
    const userFormData = this.formData.execute(userWithFiles)
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      userFormData
    )
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
