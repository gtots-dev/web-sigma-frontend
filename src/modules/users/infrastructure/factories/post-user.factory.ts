import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PostUserService } from '../services/post-user.service'
import type { PostUserServiceInterface } from '../../domain/interfaces/post-user-service.interface'

export class PostUserFactory {
  static create(): PostUserServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostUserService(executeRequest)
  }
}
