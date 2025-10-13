import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import { HttpResponseContractsValidator } from '@/modules/contracts/domain/validators/http-response-contracts.validator'
import { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { PutContractStatusRouterApiServiceInterface } from '../../domain/interfaces/put-contract-status-router-api-service.interface'

export class PutContractStatusRouterApiService
  implements PutContractStatusRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    return {
      method: 'PUT',
      data: contract,
      url: `api/contract/${contract.id}/status`
    }
  }

  async execute(contract: ContractEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(contract)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
  }
}
