import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeletePointLaneGateway } from '../../domain/gateways/delete-point-lane.gateway'
import { DeletePointLaneService } from '../services/delete-point-lane.service'

export class DeletePointLaneFactory {
  static create(params: UrlParams): DeletePointLaneGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeletePointLaneService(executeRequest, params)
  }
}
