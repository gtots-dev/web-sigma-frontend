import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { DeleteGroupSubgroupGateway } from '../../domain/gateways/delete-group-subgroup.gateway'
import { DeleteGroupSubgroupService } from '../services/delete-group-subgroup.service'

export class DeleteGroupSubgroupFactory {
  static create(params: UrlParams): DeleteGroupSubgroupGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new DeleteGroupSubgroupService(executeRequest, authToken, params)
  }
}
