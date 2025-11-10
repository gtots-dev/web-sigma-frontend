import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostProcessingUnitRouterApiGateway } from '../../domain/gateways/post-processing-unit-router-api.gateway'
import { PostProcessingUnitRouterApiService } from '../services/post-processing-unit-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostProcessingUnitRouterApiFactory {
  static create(
    params: UrlParams
  ): PostProcessingUnitRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostProcessingUnitRouterApiService(executeRequest, params)
  }
}
