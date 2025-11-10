import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import { PatchLaneService } from '../services/patch-lane.service'
import type { PatchLaneServiceInterface } from '../../domain/interfaces/patch-lane-service.interface'

export class PatchLaneFactory {
  static create(params: UrlParams): PatchLaneServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchLaneService(executeRequest, authToken, params)
  }
}
