import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostContractFilesRouterApiGateway } from '../../domain/gateways/post-contract-files-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ContractFilesInterface } from '@/modules/contracts/domain/interfaces/contract-files.interface'

export class PostContractFilesRouterApiService
  implements PostContractFilesRouterApiGateway
{
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(files: FormData): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      data: files,
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/files`
    }
  }

  async execute(
    files: ContractFilesInterface
  ): Promise<HttpResponseInterface<void>> {
    const formData = new FormData()

    files.files.forEach((file) =>
      formData.append(`file:${file.name}`, file, file.name)
    )

    const config = this.getHttpRequestConfig(formData)
    return await this.httpRequest.execute<void>(config)
  }
}
