import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import { PatchProcessingUnitStatusService } from '../services/patch-processing-unit-status.service'
import type { PatchProcessingUnitStatusServiceInterface } from '../../domain/interfaces/patch-processing-unit-status-service.interface'

export class PatchProcessingUnitStatusFactory {
  static create(params: UrlParams): PatchProcessingUnitStatusServiceInterface {
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
