import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { PatchPointStatusGateway } from '../../domain/gateways/patch-point-status.gateway'
import { PatchPointStatusService } from '../services/patch-point-status.service'

export class PatchPointStatusFactory {
  static create(params: UrlParams): PatchPointStatusGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchPointStatusService(executeRequest, authToken, params)
  }
}
