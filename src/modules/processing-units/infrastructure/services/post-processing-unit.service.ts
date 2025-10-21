import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import type { PostProcessingUnitServiceInterface } from '../../domain/interfaces/post-processing-unit.service'
import { HttpResponseProcessingUnitValidator } from '../../domain/validators/http-response-processing-unit.validator'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'

export class PostProcessingUnitService
  implements PostProcessingUnitServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly convertFormData: ConvertJsonToFormData
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    processingUnit: ProcessingUnitEntity
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/equipments/ups`,
      data: this.convertFormData.execute({ ...processingUnit }),
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    processingUnit: ProcessingUnitEntity
  ): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, processingUnit)
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseProcessingUnitValidator.validate(success, status)
  }
}
