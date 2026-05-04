import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteGroupPointGateway } from '../../domain/gateways/delete-group-point.gateway'
import { DeleteGroupPointService } from '../services/delete-group-point.service'

export class DeleteGroupPointFactory {
  static create(params: UrlParams): DeleteGroupPointGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteGroupPointService(executeRequest, params)
  }
}
