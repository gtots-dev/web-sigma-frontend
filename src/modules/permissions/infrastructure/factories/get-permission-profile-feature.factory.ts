import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetPermissionProfileFeatureServiceInterface } from '../../domain/interfaces/get-permission-profile-feature-service.interface'
import { GetPermissionProfileFeatureService } from '../services/get-permission-profile-feature.service'

export class GetPermissionProfileFeatureFactory {
  static create(): GetPermissionProfileFeatureServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetPermissionProfileFeatureService(executeRequest)
  }
}
