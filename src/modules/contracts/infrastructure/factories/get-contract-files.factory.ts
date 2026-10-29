import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { GetContractFilesService } from '../services/get-contract-files.service'
import type { GetContractFilesGateway } from '../../domain/gateways/get-contract-files.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractFilesFactory {
  static create(params: UrlParams): GetContractFilesGateway {
    const httpClient = HttpClientFactory.create(process.env.HOST_API)
    const executeRequest = ExecuteRequestFactory.create(httpClient)
    return new GetContractFilesService(executeRequest, params)
  }
}
