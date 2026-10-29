import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { GetContractFileRouterApiGateway } from '../../domain/gateways/get-contract-file-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UrlFileInterface } from '@/modules/contracts/domain/interfaces/url-file.interface'

export class GetContractFileRouterApiService implements GetContractFileRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig({
    operationId,
    contractId,
    fileId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/contracts/${contractId}/files/${fileId}`
    }
  }

  async execute(): Promise<UrlFileInterface> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<UrlFileInterface> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
