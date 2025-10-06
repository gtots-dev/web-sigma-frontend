import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { PostUserRouterApiServiceInterface } from '../../domain/interfaces/post-user-router-api-service.interface'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'

export class PostUserRouterApiService
  implements PostUserRouterApiServiceInterface
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly formData: ConvertJsonToFormData
  ) {}

  getHttpRequestConfig(userFormData: FormData): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      data: userFormData,
      url: 'api/user'
    }
  }
  async execute(
    userWithFiles: UserWithFiles,
    operationId: OperationEntity['id']
  ): Promise<void> {
    const payload = { ...userWithFiles, operation_id: operationId }
    const userFormData = this.formData.execute(payload)
    const settingsAuthHTTP = this.getHttpRequestConfig(userFormData)
    const { success, status } =
      await this.httpRequest.execute<null>(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, status)
  }
}
