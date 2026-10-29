import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetContractFilesGateway } from '../../domain/gateways/get-contract-files.gateway'
import type { ContractFileInterface } from '../../domain/interfaces/contract-file.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractFilesService implements GetContractFilesGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig({
    operationId,
    contractId
  }: UrlParams): HttpRequestConfig<FormData> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/contracts/${contractId}/files`,
      requiresAuth: true
    }
  }

  async execute(): Promise<ContractFileInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<ContractFileInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
