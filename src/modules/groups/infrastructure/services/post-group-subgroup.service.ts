import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { HttpResponseGroupValidator } from '../../domain/validators/http-response-group.validator'
import type { PostGroupSubgroupGateway } from '../../domain/gateways/post-group-subgroup.gateway'
import type { GroupSubgroupInterface } from '../../domain/interfaces/group-subgroup.interface'

export class PostGroupSubgroupService implements PostGroupSubgroupGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    { operationId, contractId, groupId }: UrlParams,
    token: TokenEntities,
    subgroupId: GroupSubgroupInterface
  ): HttpRequestConfig<{ subgroup_id: GroupSubgroupInterface }> {

    return {
      method: 'POST',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${groupId}/subgroups`,
      data: { subgroup_id: subgroupId },
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(subgroupId: GroupSubgroupInterface): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      subgroupId
    )
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseGroupValidator.validate(success, status)
  }
}
