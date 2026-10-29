import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetContractFilesRouterApiGateway } from '../../domain/gateways/get-contract-files-router-api.gateway'
import type { ContractFileInterface } from '@/modules/contracts/domain/interfaces/contract-file.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractFilesRouterApiService
  implements GetContractFilesRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig({
    operationId,
    contractId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/contracts/${contractId}/files`
    }
  }

  async execute(): Promise<ContractFileInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<ContractFileInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
