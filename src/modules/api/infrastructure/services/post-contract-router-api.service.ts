import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import { HttpResponseContractsValidator } from '@/modules/contracts/domain/validators/http-response-contracts.validator'
import type { PostContractRouterApiServiceInterface } from '../../domain/interfaces/post-contract-router-api-service.interface'
import { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export class PostContractRouterApiService
  implements PostContractRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    return {
      method: 'POST',
      data: contract,
      url: 'api/contract'
    }
  }

  async execute(contract: ContractEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(contract)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
  }
}
