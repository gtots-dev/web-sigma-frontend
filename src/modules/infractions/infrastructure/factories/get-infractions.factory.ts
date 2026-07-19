import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetInfractionsGateway } from '../../domain/gateways/get-infractions.gateway'
import { GetInfractionsService } from '../services/get-infractions.service'

export class GetInfractionsFactory {
  static create(params: UrlParams): GetInfractionsGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetInfractionsService(executeRequest, params)
  }
}
