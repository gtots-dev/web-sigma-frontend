import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { DeleteStatusProcessingUnitIgnoreRouterApiGateway } from '../../domain/gateways/delete-status-processing-unit-ignore-router-api.gateway'
import { DeleteStatusProcessingUnitIgnoreRouterApiService } from '../services/delete-status-processing-unit-ignore-router-api.service'

export class DeleteStatusProcessingUnitIgnoreFactory {
  static create(params: UrlParams): DeleteStatusProcessingUnitIgnoreRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteStatusProcessingUnitIgnoreRouterApiService(executeRequest, params)
  }
}
