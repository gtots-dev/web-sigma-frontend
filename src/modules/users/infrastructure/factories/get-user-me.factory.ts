import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetUserMeService } from '../services/get-user-me.service'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'

export class GetUserMeFactory {
  static create() {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetUserMeService(executeRequest, authToken)
  }
}
