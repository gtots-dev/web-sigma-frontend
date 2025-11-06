import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { AuthTokenFactory } from '@/modules/api/infrastructure/factories/auth-token.factory'
import { GetProcessingUnitsService } from '../services/get-processing-unit.service'
import type { GetProcessingUnitsServiceInterface } from '../../domain/interfaces/get-processing-unit-service.interface'

export class GetProcessingUnitsFactory {
  static create(params: UrlParams): GetProcessingUnitsServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    const authToken = AuthTokenFactory.create()
    return new GetProcessingUnitsService(executeRequest, authToken, params)
  }
}
