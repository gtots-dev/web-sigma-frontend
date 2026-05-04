import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import type { PutContractStatusGateway } from '../../domain/gateways/put-contract-status.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PutContractStatusService implements PutContractStatusGateway {
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
      url: `/operations/${operationId}/contracts/${contract.id}/status`,
      data: contract,
      requiresAuth: true
    }
  }

  async execute(
    contract: ContractEntity
  ): Promise<HttpResponseInterface<ContractEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, contract
    )
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
