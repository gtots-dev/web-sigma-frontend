import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetProcessingUnitStatusListService } from '../services/get-processing-unit-status-list.service'
import type { GetProcessingUnitStatusListGateway } from '../../domain/gateways/get-processing-unit-status-list.gateway'

export class GetProcessingUnitStatusListFactory {
  static create(params: UrlParams): GetProcessingUnitStatusListGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetProcessingUnitStatusListService(executeRequest, params)
  }
}
