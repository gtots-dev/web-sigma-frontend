import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetGroupsRouterApiGateway } from '../../domain/gateways/get-groups-router-api.gateway'
import { HttpResponseGroupValidator } from '@/modules/groups/domain/validators/http-response-group.validator'
import type { GroupWithGroupInterface } from '@/modules/groups/domain/interfaces/group-with-group.interface'

export class GetGroupsRouterApiService implements GetGroupsRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    operationId,
    contractId
  }: UrlParams): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${operationId}/contracts/${contractId}/groups`
    }
  }

  async execute(): Promise<GroupWithGroupInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { success, data, status }: HttpResponse<GroupWithGroupInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseGroupValidator.validate(success, status)
    return data
  }
}
