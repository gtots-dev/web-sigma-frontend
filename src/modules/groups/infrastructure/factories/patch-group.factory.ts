import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { PatchGroupGateway } from '../../domain/gateways/patch-group.gateway'
import { PatchGroupService } from '../services/patch-group.service'

export class PatchGroupFactory {
  static create(params: UrlParams): PatchGroupGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchGroupService(executeRequest, authToken, params)
  }
}
