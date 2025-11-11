import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { PutPasswordResetRouterApiService } from '../services/put-password-reset-router-api.service'
import type { PutPasswordResetRouterApiGateway } from '../../domain/gateways/put-password-reset-router-api.interface'

export class PutPasswordResetRouterApiFactory {
  static create(): PutPasswordResetRouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PutPasswordResetRouterApiService(executeRequest)
  }
}
