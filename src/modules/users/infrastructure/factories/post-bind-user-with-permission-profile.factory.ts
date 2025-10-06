import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostBindUserWithPermissionProfileService } from '../services/post-bind-user-with-permission-profile.service'
import type { PostBindUserWithPermissionProfileServiceInterface } from '../../domain/interfaces/post-bind-user-with-permission-profile.interface'

export class PostBindUserWithPermissionProfileFactory {
  static create(): PostBindUserWithPermissionProfileServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostBindUserWithPermissionProfileService(executeRequest)
  }
}
