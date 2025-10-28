import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import { HttpResponseContractsValidator } from '@/modules/contracts/domain/validators/http-response-contracts.validator'
import type { PatchContractRouterApiServiceInterface } from '../../domain/interfaces/put-contract-router-api-service.interface'
import { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PatchContractRouterApiService
  implements PatchContractRouterApiServiceInterface
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId }: UrlParams,
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    return {
      method: 'PATCH',
      data: contract,
      url: `api/operations/${operationId}/contracts`
    }
  }

  async execute(contract: ContractEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, contract)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
  }
}
