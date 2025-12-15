import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseGroupValidator } from '@/modules/groups/domain/validators/http-response-group.validator'
import type { DeleteGroupPointRouterApiGateway } from '../../domain/gateways/delete-group-point-router-api.gateway'

export class DeleteGroupPointRouterApiService
  implements DeleteGroupPointRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    contractId,
    groupId,
    pointId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'DELETE',
      url: `api/operations/${operationId}/contracts/${contractId}/groups/${groupId}/points/${pointId}`
    }
  }

  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseGroupValidator.validate(success, status)
  }
}
