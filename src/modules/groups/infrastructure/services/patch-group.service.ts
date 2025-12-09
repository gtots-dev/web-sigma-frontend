import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

import type { AuthTokenProvider } from '@/modules/api/infrastructure/providers/token.provider'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { GroupEntity } from '../../domain/entities/group.entity'
import { HttpResponseGroupValidator } from '../../domain/validators/http-response-group.validator'
import type { PatchGroupGateway } from '../../domain/gateways/patch-group.gateway'

export class PatchGroupService implements PatchGroupGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly auth: AuthTokenProvider,
    private readonly params: UrlParams
  ) {}

  private normalizeGroup(group: GroupEntity): GroupEntity {
    const cfg =
      typeof group.cfg === 'string'
        ? group.cfg.trim() === ''
          ? {}
          : JSON.parse(group.cfg)
        : group.cfg

    return { ...group, cfg }
  }

  getHttpRequestConfig(
    { operationId, contractId }: UrlParams,
    token: TokenEntities,
    group: GroupEntity
  ): HttpRequestConfig<GroupEntity> {
    return {
      method: 'PATCH',
      url: `/operations/${operationId}/contracts/${contractId}/groups/${group.id}`,
      data: this.normalizeGroup(group),
      headers: token.access_token && {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    }
  }

  async execute(group: GroupEntity): Promise<void> {
    const token = await this.auth.getToken()
    const settingsAuthHTTP = this.getHttpRequestConfig(
      this.params,
      token,
      group
    )
    const { success, status }: HttpResponse<null> =
      await this.executeRequest.execute(settingsAuthHTTP)
    HttpResponseGroupValidator.validate(success, status)
  }
}
