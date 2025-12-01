import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { GetOperationsGateway } from '../../domain/gateways/get-operations.gateway'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpResponseOperationValidator } from '../../domain/validators/http-response-operation.validator'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { OperationEntity } from '../../domain/entities/operation.entity'
import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'

export class GetOperationsService implements GetOperationsGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider
  ) {}

  getHttpRequestConfig(token: TokenEntities): HttpRequestConfig {
    return {
      method: 'GET',
      url: '/operations',
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(): Promise<OperationEntity[]> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(token)
    const { success, data, status }: HttpResponse<OperationEntity[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseOperationValidator.validate(success, data, status)
    return data
  }
}
