import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import type { GetContractsServiceInterface } from '../../domain/interfaces/get-contracts-service.interface'
import { HttpResponseContractsValidator } from '../../domain/validators/http-response-contracts.validator'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractsService implements GetContractsServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    { operationId }: UrlParams
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/contracts`,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(
    token: TokenEntities,
    { operationId }: UrlParams
  ): Promise<ContractEntity[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, {
      operationId
    })
    const { success, data, status }: HttpResponse<ContractEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
    return data
  }
}
