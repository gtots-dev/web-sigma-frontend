import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { DeleteGroupPointGateway } from '../../domain/gateways/delete-group-point.gateway'
import { DeleteGroupPointService } from '../services/delete-group-point.service'

export class DeleteGroupPointFactory {
  static create(params: UrlParams): DeleteGroupPointGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new DeleteGroupPointService(executeRequest, authToken, params)
  }
}
