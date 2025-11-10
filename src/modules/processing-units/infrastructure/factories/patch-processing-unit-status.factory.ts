import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import { PatchProcessingUnitStatusService } from '../services/patch-processing-unit-status.service'
import type { PatchProcessingUnitStatusGateway } from '../../domain/gateways/patch-processing-unit-status.gateway'

export class PatchProcessingUnitStatusFactory {
  static create(params: UrlParams): PatchProcessingUnitStatusGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new PatchProcessingUnitStatusService(
      executeRequest,
      authToken,
      params
    )
  }
}
