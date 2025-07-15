import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteBindUserWithPermissionProfileServiceInterface } from '../../domain/interfaces/delete-bind-user-with-permission-profile.interface'
import { DeleteBindUserWithPermissionProfileService } from '../services/delete-bind-user-with-permission-profile.service'

export class DeleteBindUserWithPermissionProfileFactory {
  static create(): DeleteBindUserWithPermissionProfileServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteBindUserWithPermissionProfileService(executeRequest)
  }
}
