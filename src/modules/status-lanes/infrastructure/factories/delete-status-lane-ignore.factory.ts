import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteStatusLaneIgnoreGateway } from '../../domain/gateways/delete-status-lane-ignore.gateway'
import { DeleteStatusLaneIgnoreService } from '../services/delete-status-lane-ignore.service'

export class DeleteStatusLaneIgnoreFactory {
  static create(params: UrlParams): DeleteStatusLaneIgnoreGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteStatusLaneIgnoreService(executeRequest, params)
  }
}
