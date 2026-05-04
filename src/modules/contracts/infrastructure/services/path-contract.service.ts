import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { PatchContractGateway } from '../../domain/gateways/patch-contract.gateway'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PatchContractService implements PatchContractGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  private normalizeContract(contract: ContractEntity): ContractEntity {
    const cfg =
      typeof contract.cfg === 'string'
        ? contract.cfg.trim() === ''
          ? {}
          : JSON.parse(contract.cfg)
        : contract.cfg

    return { ...contract, cfg }
  }

  getHttpRequestConfig(
    { operationId }: UrlParams,
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contract.id}`,
      data: this.normalizeContract(contract),
      requiresAuth: true
    }
  }

  async execute(contract: ContractEntity): Promise<HttpResponseInterface<ContractEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params, contract
    )
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
