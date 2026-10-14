import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetLanesStatusListService } from '../services/get-lanes-status-list.service'
import type { GetLanesStatusListGateway } from '../../domain/gateways/get-lanes-status-list.gateway'

export class GetLanesStatusListFactory {
  static create(params: UrlParams): GetLanesStatusListGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetLanesStatusListService(executeRequest, params)
  }
}
