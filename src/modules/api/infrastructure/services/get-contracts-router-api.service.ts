import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ContractEntity } from '../../../contracts/domain/entities/contract.entity'
import type { GetContractsRouterApiServiceInterface } from '../../domain/interfaces/get-contracts-router-api-service.interface'
import { HttpResponseContractsValidator } from '@/modules/contracts/domain/validators/http-response-contracts.validator'

export class GetContractsRouterApiService
  implements GetContractsRouterApiServiceInterface
{
  constructor(private readonly executeRequest: ExecuteRequest) {}
  getHttpRequestConfig(): HttpRequestConfig<null, null> {
    return {
      method: 'GET',
      url: 'api/contract'
    }
  }

  async execute(): Promise<ContractEntity[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    const { success, data, status }: HttpResponse<ContractEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
    return data
  }
}
