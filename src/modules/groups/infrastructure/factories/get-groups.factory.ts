import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { GetGroupsGateway } from '../../domain/gateways/get-groups.gateway'
import { GetGroupsService } from '../services/get-groups.service'

export class GetGroupsFactory {
  static create(params: UrlParams): GetGroupsGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetGroupsService(executeRequest, authToken, params)
  }
}
