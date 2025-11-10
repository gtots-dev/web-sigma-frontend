import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ContractEntity } from '../../../contracts/domain/entities/contract.entity'
import type { GetContractsRouterApiGateway } from '../../domain/gateways/get-contracts-router-api.gateway'
import { HttpResponseContractsValidator } from '@/modules/contracts/domain/validators/http-response-contracts.validator'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class GetContractsRouterApiService
  implements GetContractsRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({ operationId }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/contracts`
    }
  }

  async execute(): Promise<ContractEntity[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, data, status }: HttpResponse<ContractEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
    return data
  }
}
