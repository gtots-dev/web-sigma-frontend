import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUsersService } from '../services/get-users.service'
import type { GetUsersServiceInterface } from '../../domain/interfaces/get-users-service.interface'

export class GetUsersFactory {
  static create(): GetUsersServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetUsersService(executeRequest)
  }
}
