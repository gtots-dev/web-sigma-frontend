import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GetGroupsGateway } from '../../domain/gateways/get-groups.gateway'
import type { GroupWithGroupInterface } from '../../domain/interfaces/group-with-group.interface'

export class GetGroupsService implements GetGroupsGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams
  ): HttpRequestConfig<null> {
    return {
      method: 'GET',
      url: `/operations/${operationId}/contracts/${contractId}/groups`,
      requiresAuth: true
    }
  }

  async execute(): Promise<GroupWithGroupInterface[]> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    const { data }: HttpResponseInterface<GroupWithGroupInterface[]> =
      await this.executeRequest.execute(settingsAuthHTTP)
    return data
  }
}
