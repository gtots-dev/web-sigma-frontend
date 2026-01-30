import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PatchContractRouterApiGateway } from '../../domain/gateways/put-contract-router-api.gateway'
import { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PatchContractRouterApiService
  implements PatchContractRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    return {
      method: 'PATCH',
      data: contract,
      url: `api/operations/${this.params.operationId}/contracts`
    }
  }

  async execute(
    contract: ContractEntity
  ): Promise<HttpResponseInterface<ContractEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(contract)
    return await this.executeRequest.execute<ContractEntity>(settingsAuthHTTP)
  }
}
