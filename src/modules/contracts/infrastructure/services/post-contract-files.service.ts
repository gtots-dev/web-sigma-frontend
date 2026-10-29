import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostContractFilesGateway } from '../../domain/gateways/post-contract-files.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PostContractFilesService implements PostContractFilesGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(files: FormData): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/files`,
      data: files,
      requiresAuth: true
    }
  }

  async execute(files: FormData): Promise<HttpResponseInterface<void>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(files)
    return await this.httpRequest.execute(settingsAuthHTTP)
  }
}
