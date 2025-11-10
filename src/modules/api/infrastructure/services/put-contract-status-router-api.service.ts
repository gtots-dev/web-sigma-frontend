import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import { HttpResponseContractsValidator } from '@/modules/contracts/domain/validators/http-response-contracts.validator'
import { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { PutContractStatusRouterApiGateway } from '../../domain/gateways/put-contract-status-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PutContractStatusRouterApiService
  implements PutContractStatusRouterApiGateway
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
      method: 'PUT',
      data: contract,
      url: `api/operations/${operationId}/contracts/${contract.id}/status`
    }
  }

  async execute(contract: ContractEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, contract)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
  }
}
