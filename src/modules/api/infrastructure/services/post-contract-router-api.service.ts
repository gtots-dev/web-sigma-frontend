import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import {
  HttpResponseContractsValidator,
  type HttpContractError
} from '@/modules/contracts/domain/validators/http-response-contracts.validator'
import type { PostContractRouterApiGateway } from '../../domain/gateways/post-contract-router-api.gateway'
import { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class PostContractRouterApiService
  implements PostContractRouterApiGateway
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
      method: 'POST',
      data: contract,
      url: `api/operations/${operationId}/contracts`
    }
  }

  async execute(contract: ContractEntity): Promise<HttpContractError> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, contract)
    const { success, status, message } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    console.log({ success, status, message })

    return HttpResponseContractsValidator.validate(success, status, message)
  }
}
