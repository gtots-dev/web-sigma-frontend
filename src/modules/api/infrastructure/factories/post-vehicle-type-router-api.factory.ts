import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostVehicleTypeRouterApiGateway } from '../../domain/gateways/post-vehicle-type-router-api.gateway'
import { PostVehicleTypeRouterApiService } from '../services/post-vehicle-type-router-api.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostVehicleTypeRouterApiFactory {
  static create(params: UrlParams): PostVehicleTypeRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostVehicleTypeRouterApiService(executeRequest, params)
  }
}
