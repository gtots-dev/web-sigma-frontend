import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import type { PostContractFilesGateway } from '../../domain/gateways/post-contract-files.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostContractFilesService } from '../services/post-contract-files.service'

export class PostContractFilesFactory {
  static create(params: UrlParams): PostContractFilesGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new PostContractFilesService(executeRequest, params)
  }
}
