import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetStatusProcessingUnitIgnoreGateway } from '../../domain/gateways/get-status-processing-unit-ignore.gateway'
import { GetStatusProcessingUnitIgnoreService } from '../services/get-status-processing-unit-ignore.service'

export class GetStatusProcessingUnitIgnoreFactory {
  static create(params: UrlParams): GetStatusProcessingUnitIgnoreGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetStatusProcessingUnitIgnoreService(executeRequest, params)
  }
}
