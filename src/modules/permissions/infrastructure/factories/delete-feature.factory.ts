import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { DeleteFeatureServiceInterface } from '../../domain/interfaces/delete-feature-service.interface'
import { DeleteFeatureService } from '../services/delete-feature.service'

export class DeleteFeatureFactory {
  static create(): DeleteFeatureServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new DeleteFeatureService(executeRequest)
  }
}
