import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import type { GetFileS3RouterApiGateway } from '../../domain/gateways/get-file-s3-router-api.gateway'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetFileS3RouterApiService } from '../services/get-file-s3-router-api.service'

export class GetFileS3RouterApiFactory {
  static create(): GetFileS3RouterApiGateway {
    const httpClient = HttpClientFactory.create('/')
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetFileS3RouterApiService(executeRequest)
  }
}
