import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseGroupValidator } from '@/modules/groups/domain/validators/http-response-group.validator'
import type { PostGroupSubgroupRouterApiGateway } from '../../domain/gateways/post-group-subgroup-router-api.gateway'
import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

export class PostGroupSubgroupRouterApiService
  implements PostGroupSubgroupRouterApiGateway
{
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(
    { operationId, contractId, groupId }: UrlParams,
    subgroup: GroupEntity['id']
  ): HttpRequestConfig {
    return {
      method: 'POST',
      data: subgroup,
      url: `api/operations/${operationId}/contracts/${contractId}/groups/${groupId}/subgroups`
    }
  }

  async execute(subgroup: GroupEntity['id']): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params, subgroup)
    const { success, status } =
      await this.executeRequest.execute<null>(settingsAuthHTTP)
    HttpResponseGroupValidator.validate(success, status)
  }
}
