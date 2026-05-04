import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { PostProcessingUnitGateway } from '../../domain/gateways/post-processing-unit.gateway'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostProcessingUnitService } from '../services/post-processing-unit.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostProcessingUnitFactory {
  static create(params: UrlParams): PostProcessingUnitGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostProcessingUnitService(executeRequest, params)
  }
}
