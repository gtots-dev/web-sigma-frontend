import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetVehiclesTypesRouterApiService } from '../services/get-vehicles-types-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetVehiclesTypesRouterApiGateway } from '../../domain/gateways/get-vehicles-types-router-api.gateway'

export class GetVehiclesTypesRouterApiFactory {
  static create(params: UrlParams): GetVehiclesTypesRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetVehiclesTypesRouterApiService(executeRequest, params)
  }
}
