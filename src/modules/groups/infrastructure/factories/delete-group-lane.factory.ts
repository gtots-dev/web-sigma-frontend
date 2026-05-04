import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteGroupLaneGateway } from '../../domain/gateways/delete-group-lane.gateway'
import { DeleteGroupLaneService } from '../services/delete-group-lane.service'

export class DeleteGroupLaneFactory {
  static create(params: UrlParams): DeleteGroupLaneGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteGroupLaneService(executeRequest, params)
  }
}
