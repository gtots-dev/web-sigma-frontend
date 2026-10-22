import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteStatusProcessingUnitIgnoreGateway } from '../../domain/gateways/delete-status-processing-unit-ignore.gateway'
import { DeleteStatusProcessingUnitIgnoreService } from '../services/delete-status-processing-unit-ignore.service'

export class DeleteStatusProcessingUnitIgnoreFactory {
  static create(params: UrlParams): DeleteStatusProcessingUnitIgnoreGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteStatusProcessingUnitIgnoreService(executeRequest, params)
  }
}
