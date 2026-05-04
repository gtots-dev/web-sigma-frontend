import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PatchGroupGateway } from '../../domain/gateways/patch-group.gateway'
import { PatchGroupService } from '../services/patch-group.service'

export class PatchGroupFactory {
  static create(params: UrlParams): PatchGroupGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PatchGroupService(executeRequest, params)
  }
}
