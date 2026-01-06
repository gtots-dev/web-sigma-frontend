import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PostContractGateway } from '../../domain/gateways/post-contract.gateway'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

export class PostContractService implements PostContractGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
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
    token: TokenEntities,
    contract: ContractEntity
  ): HttpRequestConfig<ContractEntity> {
    const normalizedContract = this.normalizeContract(contract)

    return {
      method: 'POST',
      url: `/operations/${this.params.operationId}/contracts`,
      data: normalizedContract,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    contract: ContractEntity
  ): Promise<HttpResponseInterface<null> | HttpResponseErrorInterface> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token, contract)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
