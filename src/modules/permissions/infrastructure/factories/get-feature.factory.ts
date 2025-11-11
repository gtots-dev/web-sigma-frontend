import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { GetFeatureGateway } from '../../domain/gateways/get-feature.gateway'
import { GetFeatureService } from '../services/get-feature.service'

export class GetFeatureFactory {
  static create(): GetFeatureGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetFeatureService(executeRequest)
  }
}
