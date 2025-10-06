import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserWithPermissionProfileService } from '../services/get-user-with-permission-profile.service'
import type { GetUserWithPermissionProfileServiceInterface } from '../../domain/interfaces/get-user-with-permission-profile-service.interface'

export class GetUserWithPermissionProfileFactory {
  static create(): GetUserWithPermissionProfileServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUserWithPermissionProfileService(executeRequest)
  }
}
