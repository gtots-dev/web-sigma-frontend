import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { GetOperationsServiceInterface } from '../../domain/interfaces/get-operations-service.interface'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseOperationValidator } from '../../domain/validators/http-response-operation.validator'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

export class GetOperationsService implements GetOperationsServiceInterface {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(
    token: TokenEntities,
    ids?: number[]
  ): HttpRequestConfig<null, { ids: number[] }> {
    return {
      method: 'GET',
      url: '/operations/',
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      },
      params: { ids }
    }
  }

  async execute(
    token: TokenEntities,
    ids?: number[]
  ): Promise<OperationInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(token, ids)
    const { success, data, status }: HttpResponse<OperationInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseOperationValidator.validate(success, data, status)
    return data
  }
}
