import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetVehiclesTypesServiceGateway } from '../../domain/gateways/get-vehicles-types-service.gateway'
import { GetVehiclesTypesService } from '../services/get-vehicles-types.service'

export class GetVehiclesTypesFactory {
  static create(params: UrlParams): GetVehiclesTypesServiceGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetVehiclesTypesService(executeRequest, authToken, params)
  }
}
