import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteGroupPointRouterApiGateway } from '../../domain/gateways/delete-group-point-router-api.gateway'
import { DeleteGroupPointRouterApiService } from '../services/delete-group-point-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteGroupPointRouterApiFactory {
  static create(params: UrlParams): DeleteGroupPointRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteGroupPointRouterApiService(executeRequest, params)
  }
}
