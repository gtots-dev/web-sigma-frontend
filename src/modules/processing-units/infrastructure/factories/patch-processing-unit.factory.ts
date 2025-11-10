import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import type { PatchProcessingUnitGateway } from '../../domain/gateways/patch-processing-unit.gateway'
import { PatchProcessingUnitService } from '../services/patch-processing-unit.service'

export class PatchProcessingUnitFactory {
  static create(params: UrlParams): PatchProcessingUnitGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchProcessingUnitService(executeRequest, authToken, params)
  }
}
