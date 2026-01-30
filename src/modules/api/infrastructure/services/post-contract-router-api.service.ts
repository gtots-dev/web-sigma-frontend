import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PostContractRouterApiGateway } from '../../domain/gateways/post-contract-router-api.gateway'
import { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PostContractRouterApiService
  implements PostContractRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  private getHttpRequestConfig(
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    return {
      method: 'POST',
      data: contract,
      url: `api/operations/${this.params.operationId}/contracts`
    }
  }

  async execute(
    contract: ContractEntity
  ): Promise<HttpResponseInterface<ContractEntity>> {
    const config = this.getHttpRequestConfig(contract)
    return await this.executeRequest.execute(config)
  }
}
