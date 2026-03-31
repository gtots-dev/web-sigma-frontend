import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostVehicleTypeService } from '../services/post-vehicle-type.service'
import { PostVehicleTypeServiceGateway } from '../../domain/gateways/post-vehicle-type-service.gateway'

export class PostVehicleTypeFactory {
  static create(params: UrlParams): PostVehicleTypeServiceGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PostVehicleTypeService(executeRequest, authToken, params)
  }
}
