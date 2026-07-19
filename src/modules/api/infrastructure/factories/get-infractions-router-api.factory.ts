import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetInfractionsRouterApiGateway } from '../../domain/gateways/get-infractions-router-api.gateway'
import { GetInfractionsRouterApiService } from '../services/get-infractions-router-api.service'

export class GetInfractionsRouterApiFactory {
  static create(params: UrlParams): GetInfractionsRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetInfractionsRouterApiService(executeRequest, params)
  }
}
