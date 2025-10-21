import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { PostProcessingUnitServiceInterface } from '../../domain/interfaces/post-processing-unit.service'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostProcessingUnitService } from '../services/post-processing-unit.service'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PostProcessingUnitFactory {
  static create(): PostProcessingUnitServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const formDataConvert = FormDataConverterFactory.create()
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostProcessingUnitService(executeRequest, formDataConvert)
  }
}
