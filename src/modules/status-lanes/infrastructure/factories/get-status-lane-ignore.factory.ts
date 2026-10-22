import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetStatusLaneIgnoreGateway } from '../../domain/gateways/get-status-lane-ignore.gateway'
import { GetStatusLaneIgnoreService } from '../services/get-status-lane-ignore.service'

export class GetStatusLaneIgnoreFactory {
  static create(params: UrlParams): GetStatusLaneIgnoreGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetStatusLaneIgnoreService(executeRequest, params)
  }
}
