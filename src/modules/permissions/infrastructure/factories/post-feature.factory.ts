import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostFeatureServiceInterface } from '../../domain/interfaces/post-feature-service.interface'
import { PostFeatureService } from '../services/post-feature.service'

export class PostFeatureFactory {
  static create(): PostFeatureServiceInterface {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostFeatureService(executeRequest)
  }
}
