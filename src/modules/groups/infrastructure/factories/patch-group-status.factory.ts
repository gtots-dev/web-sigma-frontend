import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { PatchGroupStatusGateway } from '../../domain/gateways/patch-group-status.gateway'
import { PatchGroupStatusService } from '../services/patch-group-status.service'

export class PatchGroupStatusFactory {
  static create(params: UrlParams): PatchGroupStatusGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchGroupStatusService(executeRequest, authToken, params)
  }
}
