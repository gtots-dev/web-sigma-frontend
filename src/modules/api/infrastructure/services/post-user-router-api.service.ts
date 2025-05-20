import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import { HttpResponseUserValidator } from '../../../users/domain/validators/http-response-user.validator'
import type { PostUserRouterApiServiceInterface } from '../../domain/interfaces/post-user-router-api-service.interface'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export class PostUserRouterApiService
  implements PostUserRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(user: UserWithFiles): HttpRequestConfig<FormData> {
    const converterJsonToFormData = FormDataConverterFactory.create()
    const { files, ...userWithoutFiles } = user

    const userFormData =
      converterJsonToFormData.execute<typeof userWithoutFiles>(userWithoutFiles)

    if (files) {
      Object.values(files)
        .filter((file): file is Blob => file instanceof Blob)
        .forEach((file) => {
          userFormData.append('files', file)
        })
    }

    return {
      method: 'POST',
      data: userFormData,
      url: 'api/user'
    }
  }

  async execute(user: UserWithFiles): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(user)
    const { success, data, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseUserValidator.validate(success, data, status)
  }
}
