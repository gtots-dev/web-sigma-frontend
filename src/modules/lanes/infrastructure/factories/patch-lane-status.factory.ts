import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { PatchLaneStatusGateway } from '../../domain/gateways/patch-lane-status.gateway'
import { PatchLaneStatusService } from '../services/patch-lane-status.service'

export class PatchLaneStatusFactory {
  static create(params: UrlParams): PatchLaneStatusGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchLaneStatusService(executeRequest, authToken, params)
  }
}
