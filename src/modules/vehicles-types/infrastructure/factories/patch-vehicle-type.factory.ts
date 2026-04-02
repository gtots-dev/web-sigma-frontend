import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchVehicleTypeService } from '../services/patch-vehicle-type.service'
import { PatchVehicleTypeServiceGateway } from '../../domain/gateways/patch-vehicle-type-service.gateway'

export class PatchVehicleTypeFactory {
  static create(params: UrlParams): PatchVehicleTypeServiceGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchVehicleTypeService(executeRequest, authToken, params)
  }
}
