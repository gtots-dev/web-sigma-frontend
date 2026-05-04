import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetPointsGateway } from '../../domain/gateways/get-points.gateway'
import { GetPointsService } from '../services/get-points.service'

export class GetPointsFactory {
  static create(params: UrlParams): GetPointsGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetPointsService(executeRequest, params)
  }
}
