import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PatchUserStatusGateway } from '../../domain/gateways/patch-user-status.gateway'
import { PatchUserStatusService } from '../services/patch-user-status.service'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchUserStatusFactory {
  static create(params: UrlParams): PatchUserStatusGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchUserStatusService(executeRequest, params)
  }
}
