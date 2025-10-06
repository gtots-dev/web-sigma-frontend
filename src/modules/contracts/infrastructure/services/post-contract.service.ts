import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpResponseContractsValidator } from '../../domain/validators/http-response-contracts.validator'
import type { PostContractServiceInterface } from '../../domain/interfaces/post-contract-service.interface'
import type { ConvertJsonToFormData } from '@/modules/shared/infrastructure/services/convert-json-to-form-data.service'
import type { ContractEntity } from '../../domain/entities/contract.entity'

export class PostContractService implements PostContractServiceInterface {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly convertFormData: ConvertJsonToFormData
  ) {}

  getHttpRequestConfig(
    token: TokenEntities,
    contractFormData: FormData
  ): HttpRequestConfig<FormData> {
    return {
      method: 'POST',
      url: `/contracts`,
      data: contractFormData,
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(token: TokenEntities, contract: ContractEntity): Promise<void> {
    const contractFormDataConverted = this.convertFormData.execute({
      ...contract
    })
    const settingsAuthHTTP = this.getHttpRequestConfig(
      token,
      contractFormDataConverted
    )
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseContractsValidator.validate(success, status)
  }
}
