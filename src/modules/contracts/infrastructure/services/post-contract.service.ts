import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseContractsValidator } from '../../domain/validators/http-response-contracts.validator'
import type { PostContractServiceInterface } from '../../domain/interfaces/post-contract-service.interface'
import type { ContractEntity } from '../../domain/entities/contract.entity'

export class PostContractService implements PostContractServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

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
    token: TokenEntities,
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    const normalizedContract = this.normalizeContract(contract)

    return {
      method: 'POST',
      url: `/contracts`,
      data: normalizedContract,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(token: TokenEntities, contract: ContractEntity): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, contract)
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
  }
}
