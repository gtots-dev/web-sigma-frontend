import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PostContractGateway } from '../../domain/gateways/post-contract.gateway'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostContractService implements PostContractGateway {
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
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    const normalizedContract = this.normalizeContract(contract)

    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/contracts`,
      data: normalizedContract,
      requiresAuth: true
    }
  }

  async execute(
    contract: ContractEntity
  ): Promise<HttpResponseInterface<null>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(contract)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
