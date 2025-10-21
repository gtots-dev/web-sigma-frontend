import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { PostLaneServiceInterface } from '../../domain/interfaces/post-lane.service'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostLaneService } from '../services/post-lane.service'
import { FormDataConverterFactory } from '@/modules/shared/infrastructure/factories/form-data-converter.factory'

export class PostLaneFactory {
  static create(): PostLaneServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const formDataConvert = FormDataConverterFactory.create()
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostLaneService(executeRequest, formDataConvert)
  }
}
