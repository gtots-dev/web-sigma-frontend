import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PatchVehicleTypeRouterApiGateway } from '../../domain/gateways/patch-vehicle-type-router-api.gateway'
import { PatchVehicleTypeRouterApiService } from '../services/patch-vehicle-type-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchVehicleTypeRouterApiFactory {
  static create(params: UrlParams): PatchVehicleTypeRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchVehicleTypeRouterApiService(executeRequest, params)
  }
}
