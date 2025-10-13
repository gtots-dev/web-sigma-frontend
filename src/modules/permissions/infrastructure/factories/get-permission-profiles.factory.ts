import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetPermissionProfilesServiceInterface } from '../../domain/interfaces/get-permission-profiles-service.interface'
import { GetPermissionProfilesService } from '../services/get-permission-profiles.service'

export class GetPermissionProfilesFactory {
  static create(): GetPermissionProfilesServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetPermissionProfilesService(executeRequest)
  }
}
